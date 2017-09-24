import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

/*
ReadableControls component.
*/

class ReadableControls extends Component {

  constructor(props) {
    super(props);
    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onUpVote(event) {
    event.preventDefault();
    this.props.onUpVote(this.props.id);
  }

  onDownVote(event) {
    event.preventDefault();
    this.props.onDownVote(this.props.id);
  }

  onEdit(event) {
    event.preventDefault();
    this.props.onEdit(this.props.id);
  }

  onDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <ButtonToolbar>
        <Button type="button" onClick={this.onUpVote} bsStyle="primary" bsSize="xsmall">    Up Vote   </Button>
        <Button type="button" onClick={this.onDownVote} bsStyle="primary" bsSize="xsmall">  Down Vote </Button>
        <Button type="button" onClick={this.onEdit} bsStyle="primary" bsSize="xsmall">      Edit      </Button>
        <Button type="button" onClick={this.onDelete} bsStyle="primary" bsSize="xsmall">    Delete    </Button>
      </ButtonToolbar>
    );
  }

}

export default ReadableControls