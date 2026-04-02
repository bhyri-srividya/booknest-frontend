import React, { useState, useEffect } from "react";
import axios from "axios";

function BookList() {

const [books,setBooks] = useState([]);
const [query,setQuery] = useState("");

const [title,setTitle] = useState("");
const [author,setAuthor] = useState("");
const [price,setPrice] = useState("");

const [editingBookId,setEditingBookId] = useState(null);

const [studentName,setStudentName] = useState("");
const [studentEmail,setStudentEmail] = useState("");
const [selectedBook,setSelectedBook] = useState(null);

// ✅ NEW STATE
const [loanDays,setLoanDays] = useState(7);

useEffect(()=>{
fetchBooks();
},[]);

const fetchBooks = async ()=>{
const res = await axios.get("http://localhost:8080/books");
setBooks(res.data);
};

const addBook = async ()=>{

if(!title || !author || !price){
alert("Enter all fields");
return;
}

await axios.post("http://localhost:8080/books",{
title,
author,
price
});

setTitle("");
setAuthor("");
setPrice("");

fetchBooks();
};

const startEdit = (book)=>{
setEditingBookId(book.id);
setTitle(book.title);
setAuthor(book.author);
setPrice(book.price);
};

const updateBook = async ()=>{

await axios.put(`http://localhost:8080/books/${editingBookId}`,{
title,
author,
price
});

setTitle("");
setAuthor("");
setPrice("");
setEditingBookId(null);

fetchBooks();
};

const deleteBook = async(id)=>{
await axios.delete(`http://localhost:8080/books/${id}`);
fetchBooks();
};

const searchBooks = (e)=>{
e.preventDefault();

if(query===""){
fetchBooks();
return;
}

const filtered = books.filter((b)=>
b.title.toLowerCase().includes(query.toLowerCase())
);

setBooks(filtered);
};

// ✅ FIXED ISSUE FUNCTION
const issueBook = async ()=>{

if(!studentName || !studentEmail){
alert("Enter student details");
return;
}

await axios.post("http://localhost:8080/issuedBooks/issue",{

bookId:selectedBook.id,
studentName:studentName,
studentEmail:studentEmail,
loanDays:parseInt(loanDays)   // ✅ IMPORTANT

});

alert("Book Issued Successfully ✅");

setStudentName("");
setStudentEmail("");
setSelectedBook(null);
setLoanDays(7);

};

const logout = ()=>{
localStorage.removeItem("user");
window.location.href="/";
};

return(

<div style={styles.page}>

<style>{`
@keyframes flyBook {
0% { transform: translateX(-50px); }
50% { transform: translateX(50px); }
100% { transform: translateX(-50px); }
}
`}</style>

{/* HEADER */}
<div style={styles.header}>
<span style={styles.flyingBook}>📖</span>
<h1 style={styles.title}>BOOKNEST</h1>

<div style={{position:"absolute",right:"0"}}>

<button
onClick={()=>window.location.href="/issuedbooks"}
style={styles.issuedBtn}
>
Issued Books
</button>

<button onClick={logout} style={styles.logoutBtn}>
Logout
</button>

</div>
</div>

{/* ADD BOOK */}
<div style={styles.form}>

<input
placeholder="Book Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={styles.input}
/>

<input
placeholder="Author"
value={author}
onChange={(e)=>setAuthor(e.target.value)}
style={styles.input}
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
style={styles.input}
/>

{editingBookId ? (
<button onClick={updateBook} style={styles.updateBtn}>
Update Book
</button>
):(
<button onClick={addBook} style={styles.addBtn}>
Add Book
</button>
)}

</div>

{/* SEARCH */}
<form onSubmit={searchBooks} style={styles.searchBox}>
<input
placeholder="Search Book..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
style={styles.searchInput}
/>
<button style={styles.searchBtn}>
Search
</button>
</form>

{/* TABLE */}
<table style={styles.table}>
<thead>
<tr>
<th>ID</th>
<th>Title</th>
<th>Author</th>
<th>Price</th>
<th>Actions</th>
</tr>
</thead>

<tbody>
{books.map((book)=>(
<tr key={book.id}>
<td>{book.id}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>${book.price}</td>

<td>
<button
onClick={()=>setSelectedBook(book)}
style={styles.issueBtn}
>
Issue
</button>

<button
onClick={()=>startEdit(book)}
style={styles.updateSmall}
>
Update
</button>

<button
onClick={()=>deleteBook(book.id)}
style={styles.deleteBtn}
>
Delete
</button>
</td>

</tr>
))}
</tbody>
</table>

{/* ISSUE FORM */}
{selectedBook && (

<div style={styles.issueForm}>

<h3>Issue Book: {selectedBook.title}</h3>

<input
placeholder="Student Name"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
style={styles.input}
/>

<input
placeholder="Student Email"
value={studentEmail}
onChange={(e)=>setStudentEmail(e.target.value)}
style={styles.input}
/>

{/* ✅ NEW DROPDOWN */}
<select
value={loanDays}
onChange={(e)=>setLoanDays(e.target.value)}
style={styles.input}
>
<option value="7">7 Days</option>
<option value="14">14 Days</option>
</select>

<button
onClick={issueBook}
style={styles.confirmBtn}
>
Confirm Issue
</button>

</div>

)}

{/* GALLERY */}
<h2 style={{marginTop:"40px"}}>Books Gallery</h2>

<div style={styles.gallery}>
{books.map((book)=>(
<div key={book.id} style={styles.card}>
<h3>{book.title}</h3>
<p>Author: {book.author}</p>
<p>Price: ${book.price}</p>
</div>
))}
</div>

</div>
);
}

const styles = {
page:{ padding:"40px", fontFamily:"Arial", background:"#f5f5f5" },
header:{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"30px", position:"relative" },
title:{ fontSize:"42px", letterSpacing:"6px", color:"#4e342e" },
flyingBook:{ fontSize:"40px", marginRight:"10px", animation:"flyBook 3s infinite" },
logoutBtn:{ background:"#c62828", color:"white", border:"none", padding:"10px 20px" },
issuedBtn:{ background:"#6d4c41", color:"white", border:"none", padding:"10px 20px", marginRight:"10px" },
form:{ display:"flex", gap:"10px", marginBottom:"20px" },
input:{ padding:"10px", fontSize:"14px" },
addBtn:{ background:"#2e7d32", color:"white", border:"none", padding:"10px" },
updateBtn:{ background:"#f9a825", border:"none", padding:"10px" },
searchBox:{ marginBottom:"20px" },
searchInput:{ padding:"10px", marginRight:"10px" },
searchBtn:{ padding:"10px", background:"#1565c0", color:"white", border:"none" },
table:{ width:"100%", borderCollapse:"collapse", marginBottom:"30px" },
issueBtn:{ background:"#3949ab", color:"white", border:"none", padding:"6px 10px", marginRight:"5px" },
updateSmall:{ background:"#f9a825", border:"none", padding:"6px 10px", marginRight:"5px" },
deleteBtn:{ background:"#c62828", color:"white", border:"none", padding:"6px 10px" },
issueForm:{ background:"#eeeeee", padding:"20px", borderRadius:"10px", marginBottom:"30px" },
confirmBtn:{ background:"#2e7d32", color:"white", border:"none", padding:"10px 20px", marginTop:"10px" },
gallery:{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"20px" },
card:{ background:"white", padding:"20px", borderRadius:"10px", boxShadow:"0px 4px 10px rgba(0,0,0,0.1)" }
};

export default BookList;