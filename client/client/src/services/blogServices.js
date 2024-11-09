import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const createBlog = async (blog) => {
  const response = await axios.post(`${API_URL}/blogs`, blog);
  return response.data;
};

export const updateBlog = async (id, blog) => {
  const response = await axios.put(`${API_URL}/blogs/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`);
  return response.data;
};
