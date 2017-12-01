import * as readablesAPI from '../readablesAPI'

export const STASH_POSTS = 'STASH_POSTS'
export const STASH_CATEGORIES = 'STASH_CATEGORIES'
export const STASH_NEW_POST_CATEGORIES = 'STASH_NEW_POST_CATEGORIES'
export const STASH_POSTS_ORDER_BY_VALUE = 'STASH_POSTS_ORDER_BY_VALUE'
export const STASH_CATEGORY_FOR_NEW_POST = 'STASH_CATEGORY_FOR_NEW_POST'
export const STASH_ID_FOR_EDIT_POST = 'STASH_ID_FOR_EDIT_POST'
export const STASH_COMMENTS = 'STASH_COMMENTS'
export const STASH_COMMENTS_ORDER_BY_VALUE = 'STASH_COMMENTS_ORDER_BY_VALUE'
export const STASH_COMMENT_TO_EDIT = 'STASH_COMMENT_TO_EDIT'
export const STASH_POST_DETAILS = 'STASH_POST_DETAILS'
export const STASH_POST_DETAILS_EDIT = 'STASH_POST_DETAILS_EDIT'

export function stashPosts (postsArray) {
  return {
    type: STASH_POSTS,
    posts: postsArray
  };
}

export function stashCategories (categoriesArray) {
  return {
    type: STASH_CATEGORIES,
    categories: categoriesArray
  };
}


export function stashNewPostCategories (newPostCategoriesArray) {
  return {
    type: STASH_NEW_POST_CATEGORIES,
    newPostCategories: newPostCategoriesArray
  };
}

export function stashPostsOrderByValue (postsOrderByValue) {
  return {
    type: STASH_POSTS_ORDER_BY_VALUE,
    postsOrderByValue: postsOrderByValue
  };
}

export function stashCategoryForNewPost (categoryForNewPost) {
  return {
    type: STASH_CATEGORY_FOR_NEW_POST,
    categoryForNewPost: categoryForNewPost
  };
}

export function stashIdForEditPost (idForEditPost) {
  return {
    type: STASH_ID_FOR_EDIT_POST,
    idForEditPost
  };
}

export function stashComments (commentsArray) {
  return {
    type: STASH_COMMENTS,
    comments : commentsArray
  };
}

export function stashCommentsOrderByValue (commentsOrderByValue) {
  return {
    type: STASH_COMMENTS_ORDER_BY_VALUE,
    commentsOrderByValue
  };
}

export function stashCommentToEdit (commentToEdit) {
  return {
    type: STASH_COMMENT_TO_EDIT,
    commentToEdit
  };
}

// postDetails : a Post object
export function stashPostDetails (postDetails) {
  return {
    type: STASH_POST_DETAILS,
    postDetails
  };
}


// postDetailsEdit : true / false value denoting whether we are in edit mode or not
export function stashPostDetailsEdit (postDetailsEdit) {
  return {
    type: STASH_POST_DETAILS_EDIT,
    postDetailsEdit: postDetailsEdit
  };
}

export function loadCategoriesAsync () {
  return function(dispatch){
    readablesAPI.getAllCategories()
    .then((categories) => {
      dispatch(stashCategories(categories));
    })
    .catch(function(error) {
      console.log("error: " + error);
    });
  }
}

export function loadPostCommentsCountAsync (post) {
  return function(dispatch) {
    readablesAPI.getCommentsForPost(post.id)
    .then((comments) => {
      let newPosts = [...this.props.posts];
      for(let i = 0 ; i < newPosts.length ; ++i){
        if (newPosts[i].id === post.id) {
          newPosts[i].commentsCount = comments.length;
          break;
        }
      }
      dispatch(stashPosts(newPosts));
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}
