import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { stashCategories } from '../actions'
import * as readablesAPI from '../readablesAPI'

/*
CategoriesListWithRedux component implementation.
*/

class CategoriesList extends Component {

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {
    readablesAPI.getAllCategories()
    .then((categories) => {
      this.props.boundCategories(categories);
    })
    .catch(function(error) {
      console.log("error: " + error);
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h2>Categories of Posts</h2>
        <div className="list-ol">
          <div>{this.props.categories.length === 0 && `No categories to display`}</div>
          <ol>
            {
              this.props.categories.map((category, index)=>(<li key={category.path}><Link to={`/category/${category.path}`}>{category.name}</Link></li>))
            }
          </ol>
        </div>
      </div>
    );
  }

}

let mapStateToProps = state => ({
  categories: state.categories
})

let mapDispatchToProps = dispatch => ({
  boundCategories: (categories) => dispatch(stashCategories(categories))
})

let CategoriesListWithRedux = connect(mapStateToProps, mapDispatchToProps)(CategoriesList);

export default CategoriesListWithRedux