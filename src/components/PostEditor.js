import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'react-bootstrap'

/*
PostEditor component implementation.
*/

const customPostEditorStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class PostEditor extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
  }

  render() {
    return (
      <ReactModal isOpen={this.props.isOpen} contentLabel="Edit Post" style={customPostEditorStyles}  >
        <form onSubmit={this.props.onSubmit} onChange={this.handleChange}>
          <h3>Post editor:</h3>
          <FormGroup controlId="postEditorPostTitle">
            <ControlLabel>Title:</ControlLabel>
            <FormControl componentClass="input" name="title" defaultValue={this.props.title}></FormControl>
          </FormGroup>
          <FormGroup controlId="postEditorPostBody">
            <ControlLabel>Body:</ControlLabel>
            <FormControl componentClass="textarea" name="body" defaultValue={this.props.body} cols="80" rows="10"/>
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button onClick={this.props.onClose} bsStyle="primary">Close</Button>
              <Button type="submit" bsStyle="primary">Save & Close</Button>
            </ButtonToolbar>
          </FormGroup>
        </form>
      </ReactModal>
    );
  }

}

export default PostEditor