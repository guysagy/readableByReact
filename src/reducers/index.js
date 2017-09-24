
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

  let newState = {};

  switch (action.type) {

    case STASH_POSTS :
      Object.assign(newState, state);
      newState.posts = action.posts;
      return newState;

    case STASH_CATEGORIES :
      Object.assign(newState, state);
      newState.categories = action.categories;
      return newState;

    case STASH_NEW_POST_CATEGORIES :
      Object.assign(newState, state);
      newState.newPostCategories = action.newPostCategories;
      return newState;

    case STASH_POSTS_ORDER_BY_VALUE :
      Object.assign(newState, state);
      newState.postsOrderByValue = action.postsOrderByValue;
      return newState;

    case STASH_CATEGORY_FOR_NEW_POST :
      Object.assign(newState, state);
      newState.categoryForNewPost = action.categoryForNewPost;
      return newState;

    case STASH_ID_FOR_EDIT_POST :
      Object.assign(newState, state);
      newState.idForEditPost = action.idForEditPost;
      return newState;

    case STASH_COMMENTS :
      Object.assign(newState, state);
      newState.comments = action.comments;
      return newState;

    case STASH_COMMENTS_ORDER_BY_VALUE :
      Object.assign(newState, state);
      newState.commentsOrderByValue = action.commentsOrderByValue;
      return newState;

    case STASH_COMMENT_TO_EDIT :
      Object.assign(newState, state);
      newState.commentToEdit = action.commentToEdit;
      return newState;

    case STASH_POST_DETAILS :
      Object.assign(newState, state);
      newState.postDetails = action.postDetails;
      return newState;

    case STASH_POST_DETAILS_EDIT :
      Object.assign(newState, state);
      newState.postDetailsEdit = action.postDetailsEdit;
      return newState;

    default :
      return state;

  }

}

export default reducer