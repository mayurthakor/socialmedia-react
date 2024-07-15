import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userId = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost({
      id: Date.now(),
      title: postTitle.current.value,
      body: postBody.current.value,
      reactions: reactions.current.value,
      userId: userId.current.value,
      tags: tags.current.value.split(" "),
    });
    postTitle.current.value = "";
    postBody.current.value = "";
    reactions.current.value = "";
    userId.current.value = "";
    tags.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID
        </label>
        <input
          type="text"
          ref={userId}
          className="form-control"
          id="userId"
          aria-describedby="emailHelp"
          placeholder="Your User ID"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          ref={postTitle}
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          placeholder="What's up!!!"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Content
        </label>
        <textarea
          type="text"
          className="form-control"
          id="body"
          ref={postBody}
          placeholder="Enter some content here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactiopostBodyns" className="form-label">
          Number of Reactions!!!
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          ref={reactions}
          aria-describedby="emailHelp"
          placeholder="How many people reacted?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          ref={tags}
          aria-describedby="emailHelp"
          placeholder="Some Tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
