
import {
  STASH_POSTS,
  STASH_NEW_POST_CATEGORIES,
  STASH_POSTS_ORDER_BY_VALUE,
  STASH_CATEGORY_FOR_NEW_POST,
  STASH_ID_FOR_EDIT_POST,
  STASH_POST_DETAILS,
  STASH_POST_DETAILS_EDIT
} from '../actions'

const initialPostsState = {
  posts:[],
  newPostCategories:[],
  postsOrderByValue: '',
  categoryForNewPost: '',
  idForEditPost: null,
  postDetails: {},
  editPostDetails: false
}

let postsReducer = (postsCache = initialPostsState, action) => {

  switch (action.type) {

    case STASH_POSTS :
      return { ...postsCache, posts : action.posts };

    case STASH_NEW_POST_CATEGORIES :
      return { ...postsCache, newPostCategories : action.newPostCategories };

    case STASH_POSTS_ORDER_BY_VALUE :
      return { ...postsCache, postsOrderByValue : action.postsOrderByValue };

    case STASH_CATEGORY_FOR_NEW_POST :
      return { ...postsCache, categoryForNewPost : action.categoryForNewPost };

    case STASH_ID_FOR_EDIT_POST :
      return { ...postsCache, idForEditPost : action.idForEditPost };

    case STASH_POST_DETAILS :
      return { ...postsCache, postDetails : action.postDetails };

    case STASH_POST_DETAILS_EDIT :
      return { ...postsCache, postDetailsEdit : action.postDetailsEdit };

    default :
      return postsCache;
  }

};

export default postsReducer;
