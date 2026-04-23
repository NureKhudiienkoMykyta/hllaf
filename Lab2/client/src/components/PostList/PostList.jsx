import React from "react";
import PostCard from "../PostCard/PostCard";
import styles from "./PostList.module.css";

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Постів поки немає</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
