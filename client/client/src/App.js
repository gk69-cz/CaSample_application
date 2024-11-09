import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPost from './components/AddPost';
import './App.css';
import { ThemeProviderWrapper } from './themes/ThemeContext';
import './components/SplashScreen.css';
import BlogCard from './components/BlogCard';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from './services/blogServices';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handlePostAdded = (newPost) => {
    setBlogs((prevBlogs) => [newPost, ...prevBlogs]); // Add new post to the front of the list
  };
  const fetchBlogs = async () => {
    const data = await getAllBlogs();
    setBlogs(data);
  };
  
  const handleEditBlog = async () => {
    await updateBlog(currentBlogId, { title, content });
    setTitle('');
    setContent('');
    setIsEditing(false);
    setCurrentBlogId(null);
    fetchBlogs();
  };

  const handleDeleteBlog = async (id) => {
    await deleteBlog(id);
    fetchBlogs();
  };
  return (
    <div className="container">
      <header>
        <h1>Blog Application</h1>
        <AddPost onPostAdded={handlePostAdded} />
      </header>

      <div className="blog-posts">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
           
              onEdit={handleEditBlog(blog._id)}
              onDelete={handleDeleteBlog(blog._id)} 
            />
          ))
        )}
      </div>
    </div>
  );
};

function AppWithTheme() {
  return (
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  );
}

export default AppWithTheme;
