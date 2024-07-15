import { useCallback } from "react";
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addIntialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  } else if ("ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addIntialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: { posts },
    });
  };

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostList]
  );

  return (
    <PostList.Provider
      value={{ postList, addPost, addIntialPosts, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
