import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainMenu from './MainMenu'
import Home from './Home'
import PostsListWithRedux from './PostsList'
import PostDetailsWithRedux from './PostDetails'
import CategoriesListWithRedux from './CategoriesList'
import CategoryDetails from './CategoryDetails'
import './App.css';

// A group of some relevant articles for this project:
// https://react-bootstrap.github.io/components.html#forms
// https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component
// https://jaketrent.com/post/access-route-params-react-router-v4/
// Deep cloning an object as per https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript :
// http://gunnariauvinen.com/getting-es6-syntax-highlighting-in-sublime-text/

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <MainMenu/>
          </div>
          <div className="row">
            <Route exact path={`/`} component={Home} />
            <Route exact path={`/posts/`} component={PostsListWithRedux} />
            <Route exact path={`/post/:postId`} component={PostDetailsWithRedux} />
            <Route exact path={`/categories/`} component={CategoriesListWithRedux} />
            <Route exact path={`/category/:categoryPath`} component={CategoryDetails} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
