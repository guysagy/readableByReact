import {
  STASH_COMMENTS,
  STASH_COMMENTS_ORDER_BY_VALUE,
  STASH_COMMENT_TO_EDIT,
} from '../actions'

const initialCommentsState = {
  comments: [],
  commentsOrderByValue : '',
  editComment: null
}

let commentsReducer = (state = initialCommentsState, action) => {

  switch (action.type) {

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

export default commentsReducer;
