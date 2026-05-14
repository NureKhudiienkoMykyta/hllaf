import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  createPostComment,
  getPostById,
  getPostComments,
} from "../services/post.service";
import styles from "./DetailPostPage.module.css";
import MainInfo from "../components/DetailPost/MainInfo";
import CommentForm from "../components/DetailPost/CommentForm";
import CommentList from "../components/DetailPost/CommentList";

function DetailPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const commentsData = await getPostComments(id);
      setComments(commentsData.comments);
    } catch (err) {
      console.error("Помилка оновлення коментарів", err);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const postData = await getPostById(id);
        setPost(postData.post);

        await fetchComments();
      } catch (err) {
        setError(err?.response?.data?.message || "Не вдалося завантажити пост");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleAddComment = async (content) => {
    try {
      setError(null);
      await createPostComment(id, { content });
      await fetchComments();
    } catch (err) {
      setError(err?.response?.data?.message || "Не вдалося створити коментар");
    }
  };

  if (isLoading) return <div className={styles.loader}>Завантаження...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <MainInfo post={post} />
      <section className={styles.commentSection}>
        <h3>Коментарі ({comments.length})</h3>
        <CommentForm onSubmit={handleAddComment} />
        <CommentList comments={comments} />
      </section>
    </div>
  );
}

export default DetailPostPage;
