function BookItem({ book, onDelete, onChangeStatus }) {
  return (
    <div className="card">
      <div>
        <h3>Назва: {book.title}</h3>
        <p>Автор: {book.author}</p>
        <span>Статус: {book.status}</span>
      </div>

      <div className="actions">
        <select
          value={book.status}
          onChange={(e) => onChangeStatus(book.id, e.target.value)}
        >
          <option value="wishlist">Хочу прочитати</option>
          <option value="read">Прочитано</option>
          <option value="favorite">Вибране</option>
        </select>

        <button onClick={() => onDelete(book.id)}>Видалити</button>
      </div>
    </div>
  );
}

export default BookItem;
