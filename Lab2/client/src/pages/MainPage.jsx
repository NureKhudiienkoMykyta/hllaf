import React, { useState, useEffect } from "react";
import apiAxios from "../api/httpClient";

function MainPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiAxios.get("/category");
        console.log(response);
        setCategories(response.data.categories);
      } catch (error) {
        setError(
          error?.response?.data?.messag || "Помилка отримання категорій.",
        );
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
      } catch (error) {
        setError(error?.response?.data?.message || "Помилка отримання постів.");
      }
    };
    getPosts();
  }, [search, selectedCategory]);
  return <div></div>;
}

export default MainPage;
