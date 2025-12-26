import { useState } from "react";
import { createPost } from "../../services/storage";

const Feed = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePost = async () => {
    if (!content) return;
    try {
      const post = await createPost(content);
      setPosts([post, ...posts]);
      setContent("");
      alert("Post created!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Decentralized Feed (MVP)</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        cols={50}
        placeholder="Write your post..."
      />
      <br />
      <button onClick={handlePost}>Post</button>

      <hr />
      <h3>Posts</h3>
      {posts.length === 0 && <p>No posts yet</p>}
      <ul>
        {posts.map((p, idx) => (
          <li key={idx}>
            <strong>{p.author}</strong> ({p.timestamp}): <br />
            {p.content}
            <br />
            <em>Signature: {p.signature.slice(0, 20)}...</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
