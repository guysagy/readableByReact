import { combineReducers } from 'redux';
import categoriesReducer from './Categories.js';
import postsReducer from './Posts.js';
import commentsReducer from './Comments.js';

export default combineReducers({
  categoriesCache: categoriesReducer,
  postsCache: postsReducer,
  commentsCache: commentsReducer
});
