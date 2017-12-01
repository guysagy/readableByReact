import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import uuidv1 from 'uuid/v1'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import serializeForm from 'form-serialize'
import * as readablesAPI from '../readablesAPI'
import ReadableControls from './ReadableControls'
import PostEditor from './PostEditor'
import { loadPostCommentsCountAsync, stashIdForEditPost, stashCategoryForNewPost, stashPostsOrderByValue, stashNewPostCategories, stashCategories, stashPosts } from '../actions'

/*
PostsListWithRedux component implementation.
*/

class PostsList extends Component {

  constructor(props) {
    super(props);
    this.Compare = this.Compare.bind(this);
    this.postsOrderByChange = this.postsOrderByChange.bind(this);
    this.onNewPostCategoryChange = this.onNewPostCategoryChange.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmitNewPost = this.onSubmitNewPost.bind(this);
    this.onSubmitEditedPost = this.onSubmitEditedPost.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getTitleById = this.getTitleById.bind(this);
    this.getBodyById = this.getBodyById.bind(this);
  }

  componentDidMount() {
    if (this.props.category === undefined) {
      this.props.boundCategoryForNewPost(null)
      this.loadPosts();
    } else {
      this.props.boundCategoryForNewPost(this.props.category)
      this.loadPostsForCategory();
    }
    this.loadCategories();
    this.props.boundPostsOrderByValue('voteScore');
  }

  onSubmitNewPost(event) {
    event.preventDefault();
    const values = serializeForm(event.target, {hash:true});
    if (values.postTitle && values.postBody && values.selectCategoryForPost) {
      const postCreateForm = event.target;
      const id = uuidv1();
      const timestamp = Date.now();
      const author = "anonymous";
      readablesAPI.addPost(id, timestamp, values.postTitle, values.postBody, author, values.selectCategoryForPost)
      .then((result) => {
        postCreateForm.reset();
        this.props.boundCategoryForNewPost("");
        result.commentsCount = 0;
        if (this.props.category === undefined || this.props.category === values.selectCategoryForPost) {
          const posts = [...this.props.posts, result];
          this.props.boundPosts(posts);
        }
      });
    }
  }

  onSubmitEditedPost(event) {
    event.preventDefault();
    const values = serializeForm(event.target, {hash:true});
    if (this.props.idForEditPost !== null && values.title && values.body) {
      readablesAPI.updatePost(this.props.idForEditPost, values.title, values.body)
      .then((result) => {
        const posts = [...this.props.posts];
        for (let i = 0 ; i < posts.length ; i++) {
          if (posts[i].id === this.props.idForEditPost) {
            posts[i] = result;
            break;
          }
        }
        this.props.boundPosts(posts);
        this.props.boundIdForEditPost(null);
        this.props.dispatch(loadPostCommentsCountAsync(result));
      });
    }
  }

  onUpVote(postId) {
    readablesAPI.upVotePost(postId)
    .then((result) => {
      const posts = [...this.props.posts];
      for (let i = 0 ; i < posts.length ; i++) {
        if (posts[i].id === postId) {
          posts[i].voteScore = result.voteScore;
          break;
        }
      }
      this.props.boundPosts(posts);
    });
  }

  onDownVote(postId) {
    readablesAPI.downVotePost(postId)
    .then((result) => {
      const posts = [...this.props.posts];
      for (let i = 0 ; i < posts.length ; i++) {
        if (posts[i].id === postId) {
          posts[i].voteScore = result.voteScore;
          break;
        }
      }
      this.props.boundPosts(posts);
    });
  }

  onDelete(postId) {
    readablesAPI.deletePost(postId)
    .then((result) => {
      const posts = [...this.props.posts];
      for (let i = 0 ; i < posts.length ; i++) {
        if (posts[i].id === postId) {
          posts[i].deleted = result.deleted;
          break;
        }
      }
      this.props.boundPosts(posts);
    });
  }

  onEdit(postId) {
    this.handleOpenModal(postId);
  }

  handleOpenModal(postId) {
    this.props.boundIdForEditPost(postId);
  }

  handleCloseModal() {
    this.props.boundIdForEditPost(null);
  }

  loadCategories() {
    // The Select component requires the options prop to have 'value' and 'label' properties.
    readablesAPI.getAllCategories()
    .then((categories) => {
      this.props.boundCategories(categories);
      let newPostCategories = [];
      for (var i = 0 ; i < categories.length ; ++i) {
        newPostCategories.push({value: categories[i].name, label: categories[i].name});
      }
      this.props.boundNewPostCategories(newPostCategories);
    })
    .catch(function(error) {
      console.log("error: " + error);
    });
  }

  loadPosts() {
    readablesAPI.getAllPosts()
    .then((posts) => {
      this.props.boundPosts(posts);
      this.props.posts.forEach((post) => this.props.dispatch(loadPostCommentsCountAsync(post)));
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  loadPostsForCategory() {
    readablesAPI.getPostsForCategory(this.props.category)
    .then((posts) => {
      this.props.boundPosts(posts);
      this.props.posts.forEach((post) => this.props.dispatch(loadPostCommentsCountAsync(post)));
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  postsOrderByOptions = [
    { value: 'voteScore', label: 'Sorted by vote score (highest score first)' },
    { value: 'timestamp', label: 'Sorted by creation time (newest first)' }
  ];

  postsOrderByChange(newVal) {
    this.props.boundPostsOrderByValue(newVal.value);
  }

  onNewPostCategoryChange(newVal) {
    this.props.boundCategoryForNewPost(newVal.value);
  }

  getTitleById(Id){
    for (let i = 0 ; i < this.props.posts.length ; ++i){
      if (this.props.posts[i].id === Id){
        return this.props.posts[i].title;
      }
    }
    return "";
  }

  getBodyById(Id){
    for (let i = 0 ; i < this.props.posts.length ; ++i){
      if (this.props.posts[i].id === Id){
        return this.props.posts[i].body;
      }
    }
    return "";
  }

  // Utility function to help sort books on shelf by title.
  // How to sort an array based on a string property - taken from the following stack overflow post :
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
  Compare(a,b) {
    if (a[this.props.postsOrderByValue] < b[this.props.postsOrderByValue])
      return 1;
    if (a[this.props.postsOrderByValue] > b[this.props.postsOrderByValue])
      return -1;
    return 0;
  }

  renderPost(post) {
    return (<li key={post.id}>
              <FormGroup>
                <b> Title: </b><Link to={`/post/${post.id}`}>{post.title}</Link>
                <b> Author: </b>{post.author}
                <b> Votes: </b>{post.voteScore}
                <b> Created: </b>{new Date(post.timestamp).toUTCString()}
                <b> Category: </b>{post.category}
                <b> Comments Count: </b>{typeof post.commentsCount === "number" ? post.commentsCount : "Loading..."}
              </FormGroup>
              <FormGroup>
                <ReadableControls
                  id={post.id}
                  onUpVote={this.onUpVote}
                  onDownVote={this.onDownVote}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit} />
              </FormGroup>
            </li>);
  }

  render() {
    console.log(JSON.stringify(this.props));
    return (
      <div className="jumbotron">
        <h2>Posts { this.props.category && `for Category '${this.props.category}'` }</h2>
        <div className="well">
          <h3>Read ({this.props.posts.filter((post)=>(post.deleted === false)).length} posts)</h3>
          <form>
            <FormGroup controlId="selectPostsOrderBy">
              <Select name="selectPostsOrderBy"
                value={this.props.postsOrderByValue}
                options={this.postsOrderByOptions}
                onChange={this.postsOrderByChange}
                inputProps={{readOnly:true}}
                clearable={false}
                openOnFocus={true} />
            </FormGroup>
            <FormGroup controlId="formControlsPostsList">
              <div>{this.props.posts.filter((post)=>(post.deleted === false)).length === 0 && `No posts to display`}</div>
              <div className="list-ol">
                <ol>
                  {
                    this.props.posts.filter((post)=>(post.deleted === false))
                      .sort(this.Compare)
                      .map(this.renderPost)
                  }
                </ol>
              </div>
            </FormGroup>
          </form>
        </div>
        <div className="well">
          <h3>Create</h3>
          <form onSubmit={this.onSubmitNewPost}>
            <FormGroup controlId="formControlsPostCategory">
              <ControlLabel>New post category:</ControlLabel>
              <Select name="selectCategoryForPost"
                placeholder="Select a category for the new post"
                value={this.props.categoryForNewPost}
                options={this.props.newPostCategories}
                onChange={this.onNewPostCategoryChange}
                inputProps={{readOnly:true}}
                clearable={false}
                openOnFocus={true} />
            </FormGroup>
            <FormGroup controlId="formControlsPostTitle">
              <ControlLabel>New post title:</ControlLabel>
              <FormControl
                componentClass="input"
                name="postTitle"
                placeholder="Enter a new post title here" />
            </FormGroup>
            <FormGroup controlId="formControlsPostBody">
              <ControlLabel>New post body:</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="postBody"
                placeholder="Enter a new post body here"
                cols="80" rows="4" />
            </FormGroup>
            <Button type="submit" bsStyle="primary">Publish New Post</Button>
          </form>
        </div>
        <PostEditor
          isOpen={this.props.idForEditPost != null}
          onSubmit={this.onSubmitEditedPost}
          title={this.getTitleById(this.props.idForEditPost)}
          body={this.getBodyById(this.props.idForEditPost)}
          onClose={this.handleCloseModal} />
      </div>
    );
  }

}

let mapStateToProps = state => ({
  posts: state.postsCache.posts,
  categories: state.categoriesCache.categories,
  newPostCategories : state.postsCache.newPostCategories,
  postsOrderByValue: state.postsCache.postsOrderByValue,
  categoryForNewPost: state.postsCache.categoryForNewPost,
  idForEditPost: state.postsCache.idForEditPost
})

let mapDispatchToProps = dispatch => ({
  boundPosts: (posts) => dispatch(stashPosts(posts)),
  boundCategories: (categories) => dispatch(stashCategories(categories)),
  boundNewPostCategories: (newPostCategories) => dispatch(stashNewPostCategories(newPostCategories)),
  boundPostsOrderByValue: (postsOrderByValue) => dispatch(stashPostsOrderByValue(postsOrderByValue)),
  boundCategoryForNewPost: (categoryForNewPost) => dispatch(stashCategoryForNewPost(categoryForNewPost)),
  boundIdForEditPost: (idForEditPost) => dispatch(stashIdForEditPost(idForEditPost))
})

let PostsListWithRedux = connect(mapStateToProps, mapDispatchToProps)(PostsList);

export default PostsListWithRedux;

