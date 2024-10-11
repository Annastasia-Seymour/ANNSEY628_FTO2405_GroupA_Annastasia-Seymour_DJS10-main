import './App.css';
import React from 'react';

function App() {
  const [posts, setPosts] = React.useState([]); // State to hold posts
  const [postsLength, setPostsLength] = React.useState(0); // State to hold posts length
  const [error, setError] = React.useState(''); // State to hold error message

  // Use async/await to fetch the data
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setPosts(data); // Store fetched posts in state
      setPostsLength(data.length); // Set the length of the posts
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Data fetching failed'); // Set error message
    }
  };

  // Call fetchData when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App-header'>
      <h1>Posts</h1>
      {error ? ( // Conditional rendering based on error state
        <div style={{ textAlign: 'center', padding: '250px', color: 'white' }}>
          <h2>{error}</h2>
        </div>
      ) : (
        <>
          <p><i>Total posts: {postsLength}</i></p> {/* Display the length of posts */}
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
        </>
      )}
    </div>
  );
}

export default App;
