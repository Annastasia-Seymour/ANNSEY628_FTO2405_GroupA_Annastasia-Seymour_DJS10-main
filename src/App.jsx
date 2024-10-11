import './App.css';
import React from 'react';


function App() {
  const [posts, setPosts] = React.useState([]); // State to hold posts

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data); // Store fetched posts in state
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  // Call fetchData when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App-header'>
      <h1>Posts</h1>
      <ol> {/* Ordered list for numbered items */}
      {posts.map(post => ( // Display all posts
    <div key={post.id} className='post'>
      <li>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </li>
    </div>
  ))}
      </ol>
    </div>
  );
}

export default App;

