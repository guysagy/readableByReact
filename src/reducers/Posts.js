
import {
  STASH_POSTS,
  //STASH_CATEGORIES,
  STASH_NEW_POST_CATEGORIES,
  STASH_POSTS_ORDER_BY_VALUE,
  STASH_CATEGORY_FOR_NEW_POST,
  STASH_ID_FOR_EDIT_POST,
  //STASH_COMMENTS,
  //STASH_COMMENTS_ORDER_BY_VALUE,
  //STASH_COMMENT_TO_EDIT,
  STASH_POST_DETAILS,
  STASH_POST_DETAILS_EDIT
} from '../actions'

const initialPostsState = {
  posts:[],
  //categories:[],
  newPostCategories:[],
  postsOrderByValue: '',
  categoryForNewPost: '',
  idForEditPost: null,
  //comments: [],
  //commentsOrderByValue : '',
  //editComment: null,
  postDetails: {},
  editPostDetails: false
}

let postsReducer = (state = initialPostsState, action) => {

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

    default :
      return state;
  }

}

export default postsReducer