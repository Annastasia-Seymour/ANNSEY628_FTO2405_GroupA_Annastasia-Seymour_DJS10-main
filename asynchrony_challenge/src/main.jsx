//import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

const Main = () => {
  const [posts, setPosts] = useState([]); // State to hold the posts
  const [error, setError] = useState(null); // State to hold any errors

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        setPosts(data); // Set the posts state with the fetched data
      } catch (err) {
        setError(err.message); // Set the error state with the error message
      }
    };

    fetchPosts(); // Call the function
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Blog Posts</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error message if exists */}
      {posts.length === 0 ? ( // Check if there are no posts
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map(post => ( // Map through the posts and display them
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
