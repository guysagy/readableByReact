import { combineReducers } from 'redux';
import categoriesReducer from './Categories';
import postsReducer from './Posts';
import commentsReducer from './Comments';

const rootReducer = combineReducers({
  categoriesCache: categoriesReducer,
  postsCache: postsReducer,
  commentsCache: commentsReducer
});

export default rootReducer;

