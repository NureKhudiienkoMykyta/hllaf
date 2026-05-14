import styles from "./DetailPost.module.css";

const MainInfo = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("uk-UA");

  return (
    <div className={styles.mainInfo}>
      <div className={styles.meta}>
        <span className={styles.category}>{post.category.name}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.author}>
        Автор: <strong>{post.author.name}</strong>
      </p>
      <div className={styles.content}>{post.content}</div>
    </div>
  );
};
export default MainInfo;
