
import {
  STASH_CATEGORIES,
} from '../actions'

const initialCategoriesState = {
  categories:[]
}

let categoriesReducer = (state = initialCategoriesState, action) => {

  switch (action.type) {

    case STASH_CATEGORIES :
      return { categories : action.categories };

    default :
      return state;
  }

}

export default categoriesReducer;
