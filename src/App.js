import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import BookList from "./components/BookList";
import IssuedBooks from "./components/IssuedBooks";

function App() {
  return (
    <Router>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Registration Page */}
        <Route path="/register" element={<Register />} />

        {/* Books Dashboard */}
        <Route path="/books" element={<BookList />} />

        {/* Issued Books Page */}
        <Route path="/issuedbooks" element={<IssuedBooks />} />

      </Routes>

    </Router>
  );
}

export default App;