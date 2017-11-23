import React, { Component } from 'react'
import PostsListWithRedux from './PostsList'

/*
CategoryDetails component implementation.
*/

class CategoryDetails extends Component {

  render() {
    return (
      <div>
        <PostsListWithRedux title={`Posts for Category '${this.props.match.params.categoryPath}'`} category={this.props.match.params.categoryPath} />
      </div>
    );
  }

}

export default CategoryDetails;