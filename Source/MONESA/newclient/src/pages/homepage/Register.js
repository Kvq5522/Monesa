import '../../../src/assets/css/App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AiFillGoogleCircle } from "react-icons/ai";


const Registerfor = props => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ username: "", password: "", passwordagain: "" })

    const submitHandler = e => {
        e.preventDefault();
        Register(details);
    }

    const [error, setError] = useState("");

    const Register = details => {
        console.log(details);
        if (details.password !== details.passwordagain) {
            console.log("Password do not matched!!")
            setError("Password do not matched!!")
        }
        else {
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error === "Error") {
                        setError("The account actually exists!!");
                    } else {
                        setError("Account has been successfully registered");
                    }
                })
                .catch((error) => {
                    console.log({ error });
                    setError("The account actually exists!!");
                })
        }
    }

    return (
        <>
            <div class="Temp">
                <form onSubmit={submitHandler}>
                    <div class="form-inner">
                        <button class="close" onClick={props.handleClose}>Close</button>
                        <h2 class="temp">Register</h2>
                        {(error != "") ? (<div class="error"><br />{error}</div>) : ""}
                        <div class="form-group"><br />
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="passwordagain">Input Password Again:</label>
                            <input type="password" name="passwordagain" id="passwordagain" onChange={e => setDetails({ ...details, passwordagain: e.target.value })} value={details.passwordagain} />
                        </div>
                        <input type="submit" value="REGISTER" />
                        <button className='registerGG' type='button' onClick={() => window.open("http://localhost:5000/auth/google", "_self")} >Register with Google <AiFillGoogleCircle></AiFillGoogleCircle></button>
                    </div>
                </form>
            </div >
        </>
    );
}

export default Registerfor