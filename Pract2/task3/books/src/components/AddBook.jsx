import { useState } from "react";

function AddBook({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("wishlist");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      status,
    };

    onAddBook(newBook);

    setTitle("");
    setAuthor("");
    setStatus("wishlist");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Додати книгу</h2>

      <input
        type="text"
        placeholder="Назва книги"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="wishlist">Хочу прочитати</option>
        <option value="read">Прочитано</option>
        <option value="favorite">Вибране</option>
      </select>

      <button type="submit">Додати</button>
    </form>
  );
}

export default AddBook;
