import { combineReducers } from 'redux';
import categoriesReducer from './Categories.js';
import postsReducer from './Posts.js';
import commentsReducer from './Comments.js';

/*
import {
  STASH_POSTS,
  STASH_CATEGORIES,
  STASH_NEW_POST_CATEGORIES,
  STASH_POSTS_ORDER_BY_VALUE,
  STASH_CATEGORY_FOR_NEW_POST,
  STASH_ID_FOR_EDIT_POST,
  STASH_COMMENTS,
  STASH_COMMENTS_ORDER_BY_VALUE,
  STASH_COMMENT_TO_EDIT,
  STASH_POST_DETAILS,
  STASH_POST_DETAILS_EDIT
} from '../actions'
*/

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer
});

/*

const initialReadablesState = {
  posts:[],
  categories:[],
  newPostCategories:[],
  postsOrderByValue: '',
  categoryForNewPost: '',
  idForEditPost: null,
  comments: [],
  commentsOrderByValue : '',
  editComment: null,
  postDetails: {},
  editPostDetails: false
}

let reducer = (state = initialReadablesState, action) => {

  switch (action.type) {

    // Posts reducer.
    case STASH_POSTS :
      return { ...state, posts : action.posts };

    case STASH_NEW_POST_CATEGORIES :
      return { ...state, newPostCategories : action.newPostCategories };

    case STASH_POSTS_ORDER_BY_VALUE :
      return { ...state, postsOrderByValue : action.postsOrderByValue };

    case STASH_CATEGORY_FOR_NEW_POST :
      return { ...state, categoryForNewPost : action.categoryForNewPost };

    case STASH_ID_FOR_EDIT_POST :
      return { ...state, idForEditPost : action.idForEditPost };

    case STASH_POST_DETAILS :
      return { ...state, postDetails : action.postDetails };

    case STASH_POST_DETAILS_EDIT :
      return { ...state, postDetailsEdit : action.postDetailsEdit };

    // Categories reducer.
    case STASH_CATEGORIES :
      return { ...state, categories : action.categories };

    // Categories
    case STASH_COMMENTS :
      return { ...state, comments : action.comments };

    case STASH_COMMENTS_ORDER_BY_VALUE :
      return { ...state, commentsOrderByValue : action.commentsOrderByValue };

    case STASH_COMMENT_TO_EDIT :
      return { ...state, commentToEdit : action.commentToEdit };

    default :
      return state;
  }

}

export default reducer
*/