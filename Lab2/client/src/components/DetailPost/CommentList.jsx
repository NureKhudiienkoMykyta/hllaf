import styles from "./DetailPost.module.css";

const CommentList = ({ comments }) => {
  return (
    <div className={styles.list}>
      {comments.length === 0 ? (
        <p className={styles.noComments}>
          Коментарів поки немає. Будьте першим!
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <strong>{comment.author?.name || "Гість"}</strong>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className={styles.commentText}>{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default CommentList;
