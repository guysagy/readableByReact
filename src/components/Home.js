import React, { Component } from 'react'
import CategoriesListWithRedux from './CategoriesList'
import PostsListWithRedux from './PostsList'

/*
Home component implementation.
*/

class Home extends Component {

  render() {
    return (
      <div >
        <CategoriesListWithRedux />
        <PostsListWithRedux />
      </div>
    );
  }

}

export default Home