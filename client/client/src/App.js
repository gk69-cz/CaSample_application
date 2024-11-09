import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Button, IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeProviderWrapper, useTheme } from './themes/ThemeContext';
import SplashScreen from './components/SplashScreen';

function App() {
  const [blogs, setBlogs] = useState([]);
  const { toggleTheme } = useTheme();
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <SplashScreen /> {/* Show splash screen initially */}
      <header>
        <h1>Blog Application</h1>
        <IconButton onClick={toggleTheme} color="inherit">
          <Brightness4 />
        </IconButton>
      </header>
      <div className="blog-posts">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <img src={blog.imageUrl} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <Button variant="contained" color="primary">Read More</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppWithTheme() {
  return (
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  );
}

export default AppWithTheme;
