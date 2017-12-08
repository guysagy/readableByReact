import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import serializeForm from 'form-serialize'
import * as readablesAPI from '../readablesAPI'
import CommentsListWithRedux from './CommentsList'
import PostEditor from './PostEditor'
import ReadableControls from './ReadableControls'
import { stashPostDetails, stashPostDetailsEdit } from '../actions'

/*
PostDetailsWithRedux component implementation.
*/

class PostDetails extends Component {

  constructor(props) {
    super(props);
    this.renderPostDetails = this.renderPostDetails.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onSubmitEditedPost = this.onSubmitEditedPost.bind(this);
  }

  componentDidMount() {
    this.loadPostDetails();
  }

  onSubmitEditedPost(event) {
    event.preventDefault();
    const values = serializeForm(event.target, {hash:true});
    if (values.title && values.body) {
      readablesAPI.updatePost(this.props.postDetails.id, values.title, values.body)
      .then((result) => {
        this.props.boundPostDetails(result);
        this.props.boundPostDetailsEdit(false);
      });
    }
  }

  onUpVote(postId) {
    if (this.props.postDetails.deleted === true){
      return;
    }
    readablesAPI.upVotePost(postId)
    .then((result) => {
      this.props.boundPostDetails(result);
    });
  }

  onDownVote(postId) {
    if (this.props.postDetails.deleted === true){
      return;
    }
    readablesAPI.downVotePost(postId)
    .then((result) => {
      this.props.boundPostDetails(result);
    });
  }

  onDelete(postId) {
    if (this.props.postDetails.deleted === true){
      return;
    }
    readablesAPI.deletePost(postId)
    .then((result) => {
      window.location = '/';
    });
  }

  onEdit() {
    this.handleOpenModal();
  }

  handleOpenModal() {
    this.props.boundPostDetailsEdit(true);
  }

  handleCloseModal() {
    this.props.boundPostDetailsEdit(false);
  }

  loadPostDetails() {
    readablesAPI.getDetailsForPost(this.props.match.params.postId)
    .then((postDetails) => {
      console.log(JSON.stringify(postDetails));
      if (postDetails.id === undefined)
        postDetails.id = null;
      this.props.boundPostDetails(postDetails);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  renderPostDetails() {
    return (
      <div>
        <h2>Post Title: {this.props.postDetails.title}</h2>
        <FormGroup>
          <ReadableControls
            id={this.props.postDetails.id}
            onUpVote={this.onUpVote}
            onDownVote={this.onDownVote}
            onDelete={this.onDelete}
            onEdit={this.onEdit} />
        </FormGroup>
        <p>Body: {this.props.postDetails.body}</p>
        <p>Author: {this.props.postDetails.author}</p>
        <p>Category: {this.props.postDetails.category}</p>
        <p>Votes: {this.props.postDetails.voteScore}</p>
        <p>Created: {new Date(this.props.postDetails.timestamp).toUTCString()}</p>
        <div className="well">
          <p>Comments:</p>
          <CommentsListWithRedux postId={this.props.match.params.postId} parentPost={this.props.postDetails} />
        </div>
        <PostEditor
          isOpen={this.props.postDetailsEdit}
          onSubmit={this.onSubmitEditedPost}
          title={this.props.postDetails.title}
          body={this.props.postDetails.body}
          onClose={this.handleCloseModal} />
      </div>
    );
  }

  render() {
    return (
      <div>
         <div className="jumbotron">
          <h2>{this.props.postDetails.id === null && `The requested post does not exist or has been deleted and is no longer viewable!`}</h2>
          {this.props.postDetails.id && this.renderPostDetails()}
        </div>
      </div>
    );
  }

}

let mapStateToProps = state => ({
  postDetails: state.postsCache.postDetails,
  postDetailsEdit: state.postsCache.postDetailsEdit
})

let mapDispatchToProps = dispatch => ({
  boundPostDetails: (postDetails) => dispatch(stashPostDetails(postDetails)),
  boundPostDetailsEdit: (postDetailsEdit) => dispatch(stashPostDetailsEdit(postDetailsEdit))
})

let PostDetailsWithRedux = connect(mapStateToProps, mapDispatchToProps)(PostDetails);

export default PostDetailsWithRedux;
