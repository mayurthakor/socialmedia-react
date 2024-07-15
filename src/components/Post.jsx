import { useContext } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SlDislike, SlLike } from "react-icons/sl";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdOutlineDeleteOutline />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          <span>
            Reactions:{" "}
            <span className="likes">
              <SlLike /> {post.reactions.likes}{" "}
            </span>
            <span className="likes">
              <SlDislike />
              {post.reactions.dislikes}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Post;
