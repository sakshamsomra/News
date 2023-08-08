import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, redirect, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export default function Myinfo() {

    axios.defaults.withCredentials = true;






    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/username").then((response) => {


            setUser(response.data);
            console.log(response.data);

        });
    }, []);



    const [email, setEmail] = useState([]);

    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/email").then((response) => {


            setEmail(response.data);
            console.log(response.data);

        });
    }, []);

    const [type, setType] = useState([]);

    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/type").then((response) => {


            setType(response.data);
            console.log(response.data);

        });
    }, []);




   



    return (

        <>

            <Navbar />

            <br />
            <br />
            <br />


            <div class="cardv">
                <div class="infos">
                    <div class="image"></div>
                    <div class="info">
                        <div>
                            <p class="name">
                                {user}
                            </p>
                            <p class="function">
                                Reader
                            </p>
                        </div>
                        <div class="stats">
                            <p class="flex flex-col">
                                E-mail
                                <span class="state-value">
                                {email} 
                                </span>
                            </p>
                            
                            <p class="flex">
                                Interest
                                <span class="state-value">
                                    {type}
                                </span>
                            </p>

                        </div>
                    </div>
                </div>
                
            </div>







        </>



    )
}