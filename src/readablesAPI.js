
const api = "http://localhost:5001"

// handleErrors utility function as suggested by the following blog post:
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { method: 'GET', headers })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { method: 'GET', headers })
    .then(handleErrors)
    .then(res => res.json())

export const getPostsForCategory = (category) =>
  fetch(`${api}/${category}/posts`, { method: 'GET', headers })
    .then(handleErrors)
    .then(res => res.json())

export const getDetailsForPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { method: 'GET', headers })
    .then(handleErrors)
    .then(res => res.json())

export const getCommentsForPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { method: 'GET', headers })
    .then(handleErrors)
    .then(res => res.json())

export const deletePost = (postId) => 
  fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
    .then(handleErrors)
    .then(res => res.json())

export const deleteComment = (commentId) => 
  fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(handleErrors)
    .then(res => res.json())

export const upVotePost = (postId) => 
  fetch(`${api}/posts/${postId}`, { method: 'POST', headers: {...headers, 'Content-Type': 'application/json'}, body:  JSON.stringify({option: 'upVote'})})
    .then(handleErrors)
    .then(res => res.json())

export const downVotePost = (postId) => 
  fetch(`${api}/posts/${postId}`, { method: 'POST', headers: {...headers, 'Content-Type': 'application/json'}, body: JSON.stringify({option: 'downVote'})})
    .then(handleErrors)
    .then(res => res.json())

export const upVoteComment = (commentId, params) => 
  fetch(`${api}/comments/${commentId}`, { method: 'POST',  headers: {...headers, 'Content-Type': 'application/json'}, body:  JSON.stringify({option: 'upVote' })})
    .then(handleErrors)
    .then(res => res.json())

export const downVoteComment = (commentId) => 
  fetch(`${api}/comments/${commentId}`, { method: 'POST', headers: {...headers, 'Content-Type': 'application/json'}, body: JSON.stringify({option: 'downVote'}) })
    .then(handleErrors)
    .then(res => res.json())

export const addPost = (id, timestamp, title, body, author, category) => 
  fetch(`${api}/posts`,
    { 
      method: 'POST', 
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({id:id, timestamp:timestamp, title:title, body:body, author:author, category:category}) 
    })
    .then(handleErrors)
    .then(res => res.json())    

export const addComment = (id, timestamp, body, author, parentId) => 
  fetch(`${api}/comments`,
    { 
      method: 'POST', 
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({id:id, timestamp:timestamp, body:body, author:author, parentId:parentId}) 
    })
    .then(handleErrors)
    .then(res => res.json())   

export const updatePost = (postId, title, body) => 
  fetch(`${api}/posts/${postId}`,
    { 
      method: 'PUT', 
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({title, body}) 
    })
    .then(handleErrors)
    .then(res => res.json())     

export const updateComment = (commentId, timestamp, body) => 
  fetch(`${api}/comments/${commentId}`,
    { 
      method: 'PUT', 
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({timestamp, body}) 
    })
    .then(handleErrors)
    .then(res => res.json())       