import apiAxios from "../api/httpClient";

export const createPost = async (payload) => {
  const response = await apiAxios.post("/post/", payload);
  return response.data;
};

export const getPosts = async (params) => {
  const response = await apiAxios.get("/post/", { params });
  return response.data;
};

export const getPostById = async (id) => {
  const response = await apiAxios.get(`/post/${id}`);
  return response.data;
};

export const getPostComments = async (postId) => {
  const response = await apiAxios.get(`/post/${postId}/comments`);
  return response.data;
};

export const createPostComment = async (postId, payload) => {
  const response = await apiAxios.post(`/post/${postId}/comments`, payload);
  return response.data;
};
