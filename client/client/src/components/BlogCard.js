import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <Card style={{ margin: '20px', backgroundColor: '#2e2e2e' }}>
      <CardContent>
        <Typography variant="h5" color="primary">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(blog._id)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(blog._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
