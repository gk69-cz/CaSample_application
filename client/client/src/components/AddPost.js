import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Container } from '@mui/material';
import './AddPosts.css';

const AddPost = ({ onPostAdded, postToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // If there's a post to edit, populate the form fields
  useEffect(() => {
    if (postToEdit) {
      setIsEditing(true);
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      setIsEditing(false);
      setTitle('');
      setContent('');
    }
  }, [postToEdit]);

  const handleCreateBlog = async () => {
    try {
      const newPost = {
        title,
        content
      };

      // For creating a new blog post
      const response = await axios.post('http://localhost:5000/api/blogs', newPost);
      onPostAdded(response.data); // Pass the new post to the parent component

      // Clear the form after submission
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditBlog = async () => {
    try {
      const updatedPost = {
        title,
        content
      };

      // Assuming you're sending the blog ID for editing an existing post
      const response = await axios.put(
        `http://localhost:5000/api/blogs/${postToEdit._id}`,
        updatedPost
      );
      onPostAdded(response.data); // Pass the updated post to the parent component

      // Clear the form after updating
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditBlog();
    } else {
      handleCreateBlog();
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} style={{ padding: '20px', backgroundColor: 'rgb(46, 46, 46)' }}>
        <h2>{isEditing ? 'Edit Blog' : 'Add New Blog Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '10px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <Button variant="contained" color="primary" type="submit">
            {isEditing ? 'Update Blog' : 'Create Blog'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPost;
