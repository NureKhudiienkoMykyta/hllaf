import React from "react";
import styles from "./PostCard.module.css";
import { useNavigate } from "react-router";

function PostCard({ post }) {
  const navigate = useNavigate();
  const { id, title, content, createdAt, author, category } = post;

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className={styles.card} onClick={() => navigate(`/post/${id}`)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.category}>{category?.name}</span>
      </div>

      <p className={styles.content}>{content}</p>

      <div className={styles.footer}>
        <span className={styles.author}>{author?.name}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </div>
  );
}

export default PostCard;
