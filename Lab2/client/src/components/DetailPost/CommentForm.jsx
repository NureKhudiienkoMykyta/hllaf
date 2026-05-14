import { useState } from "react";
import styles from "./DetailPost.module.css";

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <textarea
        placeholder="Напишіть коментар..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Відправити</button>
    </form>
  );
};
export default CommentForm;
