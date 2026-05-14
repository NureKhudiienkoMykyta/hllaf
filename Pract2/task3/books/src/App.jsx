import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const processedBooks = books
    .filter((book) => (status === "all" ? true : book.status === status))
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "newest") return b.id - a.id;
      if (sort === "oldest") return a.id - b.id;
      return 0;
    });

  const addBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const changeStatus = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book,
      ),
    );
  };

  return (
    <div className="app">
      <Header />

      <AddBook onAddBook={addBook} />

      <input
        type="text"
        placeholder="Пошук книги..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="all">Всі</option>
        <option value="wishlist">Хочу прочитати</option>
        <option value="read">Прочитано</option>
        <option value="favorite">Вибране</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Спочатку нові</option>
        <option value="oldest">Спочатку старі</option>
      </select>
      <BookList
        books={processedBooks}
        onDelete={deleteBook}
        onChangeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
