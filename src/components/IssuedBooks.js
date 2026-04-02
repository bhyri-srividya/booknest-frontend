import React, { useEffect, useState } from "react";
import axios from "axios";

function IssuedBooks() {

const [books, setBooks] = useState([]);

useEffect(() => {
    fetchIssuedBooks();
}, []);

const fetchIssuedBooks = async () => {
    const res = await axios.get("http://localhost:8080/issuedBooks");
    setBooks(res.data);
};

const returnBook = async (id) => {
    try {
        await axios.put(`http://localhost:8080/issuedBooks/return/${id}`);
        alert("Book Returned ✅");
        fetchIssuedBooks();
    } catch (error) {
        console.error(error);
        alert("Error returning book ❌");
    }
};

return (
<div style={styles.page}>

<div style={styles.card}>

<h1 style={styles.title}>📚 Issued Books</h1>

<table style={styles.table}>

<thead>
<tr style={styles.headerRow}>
<th>ID</th>
<th>Book</th>
<th>Student</th>
<th>Email</th>
<th>Issue Date</th>
<th>Due Date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{books.map((book) => (

<tr key={book.id} style={styles.row}>

<td>{book.id}</td>
<td>{book.bookTitle}</td>
<td>{book.studentName}</td>
<td>{book.studentEmail}</td>
<td>{book.issueDate}</td>
<td>{book.dueDate}</td>

{/* ✅ STATUS BADGE */}
<td>
<span style={
    book.status === "RETURNED"
    ? styles.returned
    : styles.issued
}>
    {book.status === "RETURNED" ? "Returned" : "Issued"}
</span>
</td>

{/* ✅ BUTTON */}
<td>
{book.status !== "RETURNED" && (
    <button
        onClick={() => returnBook(book.id)}
        style={styles.button}
    >
        Return
    </button>
)}
</td>

</tr>

))}

</tbody>
</table>

</div>
</div>
);
}

const styles = {

page: {
    background: "linear-gradient(to right, #667eea, #764ba2)",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center"
},

card: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    width: "95%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
},

title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
},

table: {
    width: "100%",
    borderCollapse: "collapse"
},

headerRow: {
    background: "#4CAF50",
    color: "white"
},

row: {
    textAlign: "center",
    borderBottom: "1px solid #ddd"
},

button: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
},

issued: {
    background: "#ff9800",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
},

returned: {
    background: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
}

};

export default IssuedBooks;