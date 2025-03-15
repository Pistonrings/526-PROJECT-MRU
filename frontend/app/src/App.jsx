import { useState, useEffect } from "react";
import axios from "axios";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
      });
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Social Feed</h1>
      <form onSubmit={addPost} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        />
        <button type="submit" className="submit-button">Post</button>
      </form>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
