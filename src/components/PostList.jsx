import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import GenericLoader from "./GenericLoader";

const PostList = () => {
  const { postList, addIntialPosts } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addIntialPosts(data.posts);
        setFetching(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <GenericLoader />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
