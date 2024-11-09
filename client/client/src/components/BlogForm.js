import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@mui/material';

const BlogForm = ({ onSubmit, title: initialTitle = '', content: initialContent = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px', backgroundColor: '#2e2e2e' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default BlogForm;
