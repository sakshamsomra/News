import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, redirect, Route, useNavigate } from "react-router-dom";




export default function Landing() {

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");




    const submitForm = () => {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);


        axios.post("https://backend-zeta-sooty.vercel.app/api/login", formData).then((response) => {
            if (response.data.message) {
                alert(response.data.message);
            }
            else {
                alert(" Successfull login " + username);
                navigate("/home");
            }
        })

    }

    

    useEffect(() => {

        axios.get("https://backend-zeta-sooty.vercel.app/api/login").then((response) => {
            console.log(response);
        })

    }, [])





    return (

        <>

        <div class="landingtext">Watch from anywhere</div>


            <div class="container">
                <div class="loader"></div>
                <div class="loader"></div>
                <div class="loader"></div>
            </div>
            



            <div class="login-box">

                <form >
                    <div class="user-box">
                        <input type="text" name="" required="" autocomplete="off" onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <label>Username</label>
                    </div>
                    <div class="user-box">
                        <input type="password" name="" required="" autocomplete="off" onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                        <label>Password</label>
                    </div>
                    <center>
                        <button type="button"  onClick={submitForm}>
                            SEND
                            
                        </button>
                        </center>

                       
        <p class="signin">Don't have an acount ? <Link to={'/sign'}>SignUp</Link> </p>    
                </form>
            </div>



        </>


    )
}

