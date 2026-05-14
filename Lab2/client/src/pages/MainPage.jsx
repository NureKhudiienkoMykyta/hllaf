import React, { useState, useEffect } from "react";
import apiAxios from "../api/httpClient";
import { Link } from "react-router";
import { getPosts } from "../services/post.service";
import styles from "./MainPage.module.css";
import SearchBar from "../components/SearchBar/SearchBar";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import PostList from "../components/PostList/PostList";

function MainPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await apiAxios.get("/category");
        console.log(response);
        setCategories(response.data.categories);
      } catch (error) {
        setError(
          error?.response?.data?.message || "Помилка отримання категорій.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPosts({
          search,
          categoryId: selectedCategory,
        });
        setPosts(data.posts);
      } catch (error) {
        setError(error?.response?.data?.message || "Помилка отримання постів.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [search, selectedCategory]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Блог</h1>
        <Link to="/create-post" className={styles.createBtn}>
          Створити пост
        </Link>
      </header>

      <section className={styles.filters}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      {error && <p className={styles.error}>{error}</p>}

      {isLoading ? (
        <div className={styles.loader}>Завантаження...</div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default MainPage;
