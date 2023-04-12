import "../../assets/css/index.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router";


const Password = props => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ mail: "", password: "", passwordagain: "" });
    const params = new URLSearchParams(window.location.search);
    const Mail = {
        mail: useParams().mail,
        code: params.get("code")
    }

    const submitHandler = e => {
        e.preventDefault();
        changepass(details);
    }

    const [error, setError] = useState("");
    const changepass = details => {
        console.log(Mail);
        details.mail = Mail.mail;
        fetch("/forgotpassword/reset/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Mail )
        })
            .then(response => response.json())
            .then((Data) => {
                console.log(Data);
                if (Data.check === "True") {
                    if (details.password !== details.passwordagain) {
                        console.log("Password do not matched!!");
                        setError("Password do not matched!!");
                    }
                    else if (details.password === "" && details.passwordagain === "") {
                        console.log("Please enter a Password!!");
                        setError("Please enter a Password!!");
                    }
                    else {
                        fetch("/forgotpassword/reset", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(details)
                        })
                            .then(response => response.json())
                            .then(data => {
                                navigate("/");
                            })
                    }
                }
                else {
                    navigate("/forgot")
                }
            })
            .catch((error) => {
                console.log({ error });
            })


    }

    return (

        <div className="Temp">
            <div className='changepass'>
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2 className="temp">Change Password</h2>
                        {(error !== "") ? (<div class="error"><br />{error}</div>) : ""}
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordagain">Input Password Again:</label>
                            <input type="password" name="passwordagain" id="passwordagain" onChange={e => setDetails({ ...details, passwordagain: e.target.value })} value={details.passwordagain} />
                        </div>
                        <input type="submit" value="SUBMIT" />
                    </div>
                </form>
            </div>
            
        </div>
    );
}

// if (details.password !== details.passwordagain) {
//     console.log("Password do not matched!!");
//     setError("Password do not matched!!");
// }
// else if (details.password === "" && details.passwordagain === "") {
//     console.log("Please enter a Password!!");
//     setError("Please enter a Password!!");
// }
// else {
//     fetch("/forgotpassword/reset", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(details)
//     })
//         .then(response => response.json())
//         .then(data => {
//             navigate("/forgot");
//         })
// }

export default Password