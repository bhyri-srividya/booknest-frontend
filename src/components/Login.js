import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

const navigate = useNavigate();

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async (e) => {

e.preventDefault();

try{

const res = await axios.post("http://localhost:8080/users/login",{
username,
password
});

if(res.data){

localStorage.setItem("loggedIn",true);
localStorage.setItem("username",username);

alert("Login Successful");

navigate("/books");

}

}catch(error){

alert("Invalid Username or Password");

}

};

return(

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

<form onSubmit={handleLogin}>

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
Login
</button>

</form>

<p style={{marginTop:"15px"}}>

Don't have an account?{" "}
<Link to="/register" style={{color:"#6b4f3b",fontWeight:"bold"}}>
Register
</Link>

</p>

</div>

</div>

);

}

export default Login;