"use client";
import { use, useEffect, useState } from "react";
import BookModal from "../../components/books/BookModal";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  const openModal = (book = null) => {
    setSelectedBook(book);
    setShowModal(true);
    setIsEditMode(!!book);
  };

  const handleSave = async (book) => {
    if (isEditMode) {
      await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        body: JSON.stringify(book),
      });
    } else {
      await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(book),
      });
    }
    fetchBooks();
    setShowModal(false);
  };

  const handleDelete = async (book) => {
    const confirmation = confirm("Are you sure you want to delete this book?");

    if (!confirmation) {
      return;
    }
    
    await fetch(`/api/books/${book.id}`, {
      method: "DELETE",
    });
    fetchBooks();
  };

  return (
    <div>
      <h1>Books</h1>
      <button className="btn btn-primary mt-4" onClick={() => openModal()}>
        Add Book
      </button>
      <table className="table w-full mt-2">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>
                <button
                  className="btn btn-sm mr-2"
                  onClick={() => openModal(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(book)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {showModal && (
            <BookModal
            book={selectedBook}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
            isEditMode={isEditMode}
            />
        )}
    </div>
  );
}
