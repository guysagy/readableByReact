import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { stashCategories , loadCategoriesAsync} from '../actions'
import * as readablesAPI from '../readablesAPI'

/*
CategoriesListWithRedux component implementation.
*/

class CategoriesList extends Component {

  componentDidMount() {
    loadCategoriesAsync();
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
  categories: state.categoriesCache.categories
})

let mapDispatchToProps = dispatch => ({
  boundCategories: (categories) => dispatch(stashCategories(categories))
})

let CategoriesListWithRedux = connect(mapStateToProps, mapDispatchToProps)(CategoriesList);

export default CategoriesListWithRedux;

