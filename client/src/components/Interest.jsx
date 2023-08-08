import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, redirect, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export default function Interest() {


    axios.defaults.withCredentials = true;
    



    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/username").then((response) => {


            setUser(response.data);
            console.log(response.data);

        });
    }, []);


    




    const [list, setList] = useState([]);


    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/interests").then((response) => {


            setList(response.data);

        });
    }, []);




    return (

        <>

            <Navbar />

            <div class="myinfo">
                Your Interests {user}
            </div>



            {
                list && list.length > 0
                    ?
                    list.map((val) => {

                        return (

                            <div class="cardi">
                                <h3 class="card__title">{val.type}
                                    
                                </h3>
                                <p class="card__content">{val.content}</p>
                                <div class="card__date">
                                    {val.date}
                                </div>
                                <div class="card__date" >
                                    posted by ~ {val.name}

                                </div>
                                <div class="card__arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                                    </svg>
                                </div>
                            </div>


                        )
                    })
                    :
                    "No data available"


            }


        </>



    )
}