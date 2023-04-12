import '../../../src/assets/css/App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";


function Forgot({ Forgot }) {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ username: "" })
    const [error, setError] = useState("");

    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
        fetch("/forgotpassword/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.check === "True") {
                    alert("Please Check an Email for reset link");
                    navigate("/");    
                }
                else {
                    setError("Email dosen't match!!");
                }
            })
            .catch((error) => {
                console.log({ error });
                setError("Email dosen't match!!");
            })
    }
    return (
        <>
            <div class="Temp" >
                <div class="forgot">
                    <form onSubmit={submitHandler}>
                        <div class="form-inner">
                            <h2 class="temp">FORGOT<br /> PASSWORD</h2>
                            {(error !== "") ? (<div class="error"><br />{error}</div>) : ""}
                            <div class="form-group"><br />
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                            </div>
                            <input type="submit" value="SUBMIT" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Forgot