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

let commentsReducer = (commentsCache = initialCommentsState, action) => {

  switch (action.type) {

    case STASH_COMMENTS :
      return { ...commentsCache, comments : action.comments };

    case STASH_COMMENTS_ORDER_BY_VALUE :
      return { ...commentsCache, commentsOrderByValue : action.commentsOrderByValue };

    case STASH_COMMENT_TO_EDIT :
      return { ...commentsCache, commentToEdit : action.commentToEdit };

    default :
      return commentsCache;
  }

};

export default commentsReducer;

