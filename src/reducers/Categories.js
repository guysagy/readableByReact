
import {
  STASH_CATEGORIES,
} from '../actions'

const initialCategoriesState = {
  categories:[]
}

let categoriesReducer = (categoriesCache = initialCategoriesState, action) => {

  switch (action.type) {

    case STASH_CATEGORIES :
      return { ...categoriesCache, categories : action.categories };

    default :
      return categoriesCache;
  }

};

export default categoriesReducer;

