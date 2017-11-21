
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

const initialCommentsState = {
  //posts:[],
  //categories:[],
  //newPostCategories:[],
  //postsOrderByValue: '',
  //categoryForNewPost: '',
  //idForEditPost: null,
  comments: [],
  commentsOrderByValue : '',
  editComment: null,
  //postDetails: {},
  //editPostDetails: false
}

let commentsReducer = (state = initialCommentsState, action) => {

  switch (action.type) {

    // Comments reducer.
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

export default commentsReducer