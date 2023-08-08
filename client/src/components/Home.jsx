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
                            <p>A petition has been filed in Supreme Court alleging "blatant hate speeches" calling for violence and social and economic boycott of Muslims at rallies in different states, including Haryana where recent communal clashes claimed six lives.</p>
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
                                    posted by ~ Hinustan Times


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
