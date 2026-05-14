import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiAxios from "../api/httpClient";
import { createPost } from "../services/post.service";
import styles from "./CreatePostPage.module.css";

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiAxios.get("/category");
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Помилка завантаження категорій", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createPost({
        title: formData.title,
        content: formData.content,
        categoryId: Number(formData.categoryId),
      });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Не вдалося створити пост");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Створити новий пост</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введіть заголовок поста"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="categoryId">Категорія</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Оберіть категорію</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="content">Контент</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            placeholder="Про що ви хочете розповісти?"
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.cancelBtn}
          >
            Скасувати
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Публікація..." : "Опублікувати пост"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
