import React, { useEffect, useState } from "react";
import "./FallingBooks.css";

const NUM_BOOKS = 10; // number of falling books/papers

function FallingBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < NUM_BOOKS; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100, // horizontal position in %
        delay: Math.random() * 5,   // random delay
        duration: 5 + Math.random() * 5, // random duration
        size: 20 + Math.random() * 30,  // size in px
      });
    }
    setBooks(arr);
  }, []);

  return (
    <div className="falling-container">
      {books.map((book) => (
        <div
          key={book.id}
          className="falling-book"
          style={{
            left: `${book.left}%`,
            animationDelay: `${book.delay}s`,
            animationDuration: `${book.duration}s`,
            width: `${book.size}px`,
            height: `${book.size * 1.2}px`,
          }}
        />
      ))}
    </div>
  );
}

export default FallingBooks;