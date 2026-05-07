import BookItem from "./BookItem";

function BookList({ books, onDelete, onChangeStatus }) {
  if (!books.length) {
    return <p>Книг ще немає</p>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}

export default BookList;
