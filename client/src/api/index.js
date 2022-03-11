import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' });

const url = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(`${url}/all`);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const signIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/register', formData);