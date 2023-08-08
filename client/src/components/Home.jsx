import React from "react";

import axios from "axios";

import { BrowserRouter, Links, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fruit from './photos/fruit.jpg'
import Footer from "./Footer";
import Navbar from "./Navbar";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { useSelector } from "react-redux";


export default function Home() {

    const [searchterm, setSearchterm] = useState("");
    const [results, setResults] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);








    // const Handlelike = (id) => {

    //     const formData = new FormData();
    //     formData.append('id', id);




    //     axios.put("http://localhost:3001/api/likes", formData).then(() => {
    //         alert('you liked the post');
    //     })

    // }









    const [list, setList] = useState([]);


    useEffect(() => {
        axios.get("https://backend-zeta-sooty.vercel.app/api/get").then((response) => {


            setList(response.data);

        });
    }, []);



    axios.defaults.withCredentials = true;

    useEffect(() => {

        axios.get("https://backend-zeta-sooty.vercel.app/api/login").then((response) => {
            console.log(response);
        })

    }, [])





    return (


        <>




            <Navbar />



            <div class="fields">

                <input type="text" name="text" class="input" placeholder="Search Topic!" onChange={(e) => {
                    setSearchterm(e.target.value);
                }}></input>

            </div>



            <div class="container">
                <div class="card">
                    <div class="box">
                        <div class="content">
                            <span class="heading">Top</span>
                            <span class="content">Breaking News </span>
                            <p>An open platform where you can find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.</p>
                            <Link to="/write" >Start writing</Link>
                        </div>
                    </div>
                </div></div>




            <div className="line">Trending</div>








            {
                list && list.length > 0
                    ?
                    list.filter((val) => {
                        return searchterm.toLowerCase() === '' ? val : val.body.toLowerCase().includes(searchterm)

                    }).map((val) => {

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

                                <div class="nlikes">

                                    <div class="con-like">
                                        {/* <button title="like" type="checkbox" class="like" onClick={() => { Handlelike(val.id) }} ></button> */}
                                        <div class="checkmark">
                                            <svg viewBox="0 0 24 24" class="outline" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                            </svg>
                                            <svg viewBox="0 0 24 24" class="filled" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                            </svg>
                                            <svg class="celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                                <polygon points="10,10 20,20" class="poly"></polygon>
                                                <polygon points="10,50 20,50" class="poly"></polygon>
                                                <polygon points="20,80 30,70" class="poly"></polygon>
                                                <polygon points="90,10 80,20" class="poly"></polygon>
                                                <polygon points="90,50 80,50" class="poly"></polygon>
                                                <polygon points="80,80 70,70" class="poly"></polygon>
                                            </svg>
                                        </div>

                                    </div>
                                    Liked by {val.likes}


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



            <Footer />

        </>


    )

}