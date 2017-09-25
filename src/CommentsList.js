import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap'
import ReactModal from 'react-modal'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import ReadableControls from './ReadableControls'
import * as readablesAPI from './readablesAPI'
import { stashComments, stashCommentsOrderByValue, stashCommentToEdit } from './actions'

/*
CommentsListWithRedux component implementation.
*/

const customCommentModalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CommentsList extends Component {

  constructor(props) {
    super(props);
    this.Compare = this.Compare.bind(this);
    this.commentsOrderByChange = this.commentsOrderByChange.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.loadPostComments = this.loadPostComments.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmitNewComment = this.onSubmitNewComment.bind(this);
    this.onSubmitEditedComment = this.onSubmitEditedComment.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.loadPostComments();
    this.props.boundCommentsOrderByValue('voteScore')
  }

  onSubmitNewComment(event) {
    event.preventDefault();
    if (this.props.parentPost.deleted===true){
      return;
    }
    const values = serializeForm(event.target, {hash:true});
    if (values.commentBody) {
      const commentCreateForm = event.target;
      const id = uuidv1();
      const timestamp = Date.now();
      const author = "anonymous";
      readablesAPI.addComment(id, timestamp, values.commentBody, author, this.props.postId)
      .then((result) => {
        commentCreateForm.reset();
        const newComments = [...this.props.comments, result];
        this.props.boundComments(newComments);
      });
    }
  }

  onSubmitEditedComment(event) {
    event.preventDefault();
    if (this.props.parentPost.deleted===true){
      return;
    }
    const values = serializeForm(event.target, {hash:true});
    if (this.props.commentToEdit && values.body) {
      readablesAPI.updateComment(this.props.commentToEdit.id, Date.now(), values.body)
      .then((result) => {
        const newComments = [...this.props.comments];
        for (let i = 0 ; i < newComments.length ; i++) {
          if (newComments[i].id === this.props.commentToEdit.id) {
            newComments[i].body = result.body;
            break;
          }
        }
        this.props.boundComments(newComments);
        this.props.boundCommentToEdit(null);
      });
    }
  }

  onUpVote(commentId) {
    if (this.props.parentPost.deleted===true){
      return;
    }
    readablesAPI.upVoteComment(commentId)
    .then((result) => {
      const newComments = [...this.props.comments];
      for (let i = 0 ; i < newComments.length ; i++) {
        if (newComments[i].id === commentId) {
          newComments[i].voteScore = result.voteScore;
          break;
        }
      }
      this.props.boundComments(newComments);
    });
  }

  onDownVote(commentId) {
    if (this.props.parentPost.deleted===true){
      return;
    }
    readablesAPI.downVoteComment(commentId)
    .then((result) => {
      const newComments = [...this.props.comments];
      for (let i = 0 ; i < newComments.length ; i++) {
        if (newComments[i].id === commentId) {
          newComments[i].voteScore = result.voteScore;
          break;
        }
      }
      this.props.boundComments(newComments);
    });
  }

  onDelete(commentId) {
    if (this.props.parentPost.deleted===true){
      return;
    }
    readablesAPI.deleteComment(commentId)
    .then((result) => {
      const newComments = [...this.props.comments];
      for (let i = 0 ; i < newComments.length ; i++) {
        if (newComments[i].id === commentId) {
          newComments[i].deleted = result.deleted;
          break;
        }
      }
      this.props.boundComments(newComments);
    });
  }

  onEdit(commentId) {
    if (this.props.parentPost.deleted===true){
      return;
    }
    let commentToEdit = null;
    for (let i = 0 ; i < this.props.comments.length ; ++i) {
      if (this.props.comments[i].id === commentId) {
        commentToEdit = this.props.comments[i];
        break;
      }
    }
    this.handleOpenModal(commentToEdit);
  }

  handleOpenModal(comment) {
    this.props.boundCommentToEdit(comment);
  }

  handleCloseModal() {
    this.props.boundCommentToEdit(null);
  }

  loadPostComments() {
    readablesAPI.getCommentsForPost(this.props.postId)
    .then((comments) => {
      this.props.boundComments(comments);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  commentsOrderByOptions = [
    { value: 'voteScore', label: 'Sorted by vote score (highest score first)' },
    { value: 'timestamp', label: 'Sorted by creation time (newest first)' }
  ];

  commentsOrderByChange(newVal) {
    this.props.boundCommentsOrderByValue(newVal.value);
  }

  // Utility function to help sort books on shelf by title.
  // How to sort an array based on a string property - taken from the following stack overflow post :
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
  Compare(a,b) {
      if (a[this.props.commentsOrderByValue] < b[this.props.commentsOrderByValue])
        return 1;
      if (a[this.props.commentsOrderByValue] > b[this.props.commentsOrderByValue])
        return -1;
      return 0;
  }

  renderComment(comment) {
    return (
      <li key={comment.id}>
        <FormGroup>
          <b> Comment: </b>{comment.body},
          <b> Author: </b>{comment.author}
          <b> Votes: </b>{comment.voteScore}
          <b> Created: </b>{new Date(comment.timestamp).toUTCString()}
        </FormGroup>
        <FormGroup>
          <ReadableControls type="comment" id={comment.id} onUpVote={this.onUpVote} onDownVote={this.onDownVote} onEdit={this.onEdit} onDelete={this.onDelete} />
        </FormGroup>
      </li>)
  }

  render() {
    return (
      <div>
        <div className="well">
          <h3>Read ({this.props.comments.filter((comment)=>(comment.deleted===false)).length} comments)</h3>
          <FormGroup>
            <Select name="selectCommentsOrderBy"
              value={this.props.commentsOrderByValue}
              options={this.commentsOrderByOptions}
              onChange={this.commentsOrderByChange}
              inputProps={{readOnly:true}}
              clearable={false}
              openOnFocus={true} />
          </FormGroup>
          <div>{this.props.comments.filter((comment)=>(comment.deleted === false && comment.parentDeleted === false)).length === 0 && `No comments for this post`}</div>
          <div className="list-ol">
            <ol>
              {
                this.props.comments.filter((comment)=>(comment.deleted === false && comment.parentDeleted === false))
                  .sort(this.Compare)
                  .map(this.renderComment)
              }
            </ol>
          </div>
        </div>
        <div className="well">
          <h3>Create</h3>
          <form onSubmit={this.onSubmitNewComment}>
            <FormGroup controlId="formControlsCreateCommentBody">
              <FormControl componentClass="textarea" name="commentBody" placeholder="Enter a new comment here" cols="80" rows="4"/>
            </FormGroup>
            <Button type="submit" bsStyle="primary">Publish New Comment</Button>
          </form>
        </div>
        <ReactModal isOpen={this.props.commentToEdit!=null} contentLabel="Edit Comment" role="dialog" style={customCommentModalStyles}>
          <form onSubmit={this.onSubmitEditedComment}>
            <h3>Comment editor:</h3>
            <FormGroup controlId="formControlsEditCommentBody">
              <FormControl componentClass="textarea" name="body" defaultValue={this.props.commentToEdit && this.props.commentToEdit.body} cols="80" rows="10"/>
            </FormGroup>
            <FormGroup controlId="formControlsEditButtonsToolbar">
              <ButtonToolbar>
                <Button onClick={this.handleCloseModal} bsStyle="primary">Close</Button>
                <Button type="submit" bsStyle="primary">Save & Close</Button>
              </ButtonToolbar>
            </FormGroup>
          </form>
        </ReactModal>
      </div>
    );
  }

}

let mapStateToProps = state => ({
  comments: state.comments,
  commentsOrderByValue: state.commentsOrderByValue,
  commentToEdit : state.commentToEdit
})

let mapDispatchToProps = dispatch => ({
  boundComments: (comments) => dispatch(stashComments(comments)),
  boundCommentsOrderByValue: (commentsOrderByValue) => dispatch(stashCommentsOrderByValue(commentsOrderByValue)),
  boundCommentToEdit: (commentToEdit) => dispatch(stashCommentToEdit(commentToEdit))
})

let CommentsListWithRedux = connect(mapStateToProps, mapDispatchToProps)(CommentsList);

export default CommentsListWithRedux