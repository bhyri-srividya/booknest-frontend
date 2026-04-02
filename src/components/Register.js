import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async (e) => {

e.preventDefault();

try{

await axios.post("https://booknest-backend-6wdd.onrender.com/users/register",{
username,
email,
password
});

alert("Registration Successful!");

navigate("/");

}catch(error){

alert("Error occurred while registering");

}

};

return (

<div
style={{
height:"100vh",
backgroundImage:"url('/images/library.jpg')",
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<div
style={{
background:"rgba(255,255,255,0.9)",
padding:"40px",
borderRadius:"10px",
width:"350px",
textAlign:"center",
boxShadow:"0px 8px 20px rgba(0,0,0,0.3)"
}}
>

<h2
style={{
marginBottom:"20px",
color:"#5a3e2b"
}}
>
Welcome to BookNest!
</h2>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
style={{
width:"100%",
padding:"10px",
marginBottom:"15px"
}}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
style={{
width:"100%",
padding:"10px",
marginBottom:"15px"
}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
style={{
width:"100%",
padding:"10px",
marginBottom:"20px"
}}
/>

<button
type="submit"
style={{
width:"100%",
padding:"10px",
background:"#6b4f3b",
color:"white",
border:"none",
borderRadius:"5px",
fontWeight:"bold",
cursor:"pointer"
}}
>
Register
</button>

</form>

<p style={{marginTop:"15px"}}>

Already have an account?{" "}
<Link to="/" style={{color:"#6b4f3b",fontWeight:"bold"}}>
Login
</Link>

</p>

</div>

</div>

);

}

export default Register;
