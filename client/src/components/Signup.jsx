import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [category, setCategory] = useState("")

    axios.defaults.withCredentials = true;

    const submitForm = (event) => {

        event.preventDefault();

        const form = new FormData();
        form.append('email', email);
        form.append('username', username);
        form.append('password', password);
        form.append('category', category);

        axios.post("https://backend-zeta-sooty.vercel.app/api/users", form).then(() => {
            alert('success for insert');
            navigate("/");
        })

    }





    return (






        <>


            <Navbar />

            <div class="login-box">

                <form >
                    <div class="user-box">
                        <input type="text" name="" required="" autocomplete="off" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <label>Email-id</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="" required="" autocomplete="off" onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <label>Username</label>
                    </div>
                    <div class="user-box">
                        <input type="password" name="" required="" autocomplete="off" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <label>Password</label>
                    </div>
                    <div class="user-box">
                        
                   
                        <select class="input-box" onChange={(e) => {
                            setCategory(e.target.value);
                        }}>
                            
                            <option class="option">politics</option>
                            <option class="option">sports</option>
                            <option class="option">international</option>
                            
                        </select>
                        
                        
                    </div>

                    <center>
                        <button type="submit" onClick={submitForm}>
                            SEND
                            <span></span>
                        </button>
                    </center>

                    <p class="signin">Already have an acount ? <Link to={'/'}>Signin</Link> </p>



                </form>
            </div>

        </>




    )
}

