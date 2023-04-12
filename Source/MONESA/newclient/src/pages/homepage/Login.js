import '../../../src/assets/css/App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AiFillGoogleCircle } from "react-icons/ai";

//todo note1: chính cái kia logout dum

const Login = props => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" })

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }

  const [user, setUser] = useState({ name: "", username: "" });
  const [error, setError] = useState("");
  const Login = details => {
    console.log(details);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setUser({
          username: details.username
        });
        navigate("/user/" + data._id);
      })
      .catch((error) => {
        console.log(error);
        console.log("Email or Password dosen't match!!")
        setError("Email or Password dosen't match!!");
      })
  }
  //todo logout
  const Logout = details => {
    setUser({ name: "", email: "" });
    setError("");
  }

  return (

    <div class="Temp">
      <>
        <form onSubmit={submitHandler}>
          <div class="form-inner">
            <button class="close" onClick={props.handleClose}>Close</button>
            <h2 class="temp">LOGIN</h2>
            {(error != "") ? (<div class="error"><br />{error}</div>) : ""}
            <div class="form-group"><br />
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
            </div>
            <div class="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
            </div>
            <input type="submit" value="LOGIN" />
            <button className="Forgot" onClick={() => window.open("/forgot", "_blank")} >Forgot Password </button>
            <button className="loginGG" type='button' onClick={() => window.open("http://localhost:5000/auth/google", "_self")}>Login with Google <AiFillGoogleCircle></AiFillGoogleCircle></button>
          </div>
        </form>
      </>
    </div>
  );
}

export default Login
