import React from "react";

import axios from "axios";

import { BrowserRouter, Links } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Items() {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("https://e-commerce-server-up15kl0c2-sakshamsomra.vercel.app/api/get").then((response) => {


            setList(response.data);
            console.log(response.data);

        });
    }, []); 


    return (
        <>
        <Navbar/>

        <br />



            <table class="table" id="usertable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Prod_Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">SalePrice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list && list.length > 0
                            ?
                            list.map((val) => {
                                return (
                                    <tr>
                                        <td>
                                            {val.id}
                                        </td>
                                        <td>
                                            {val.prod_name}
                                        </td>
                                        <td>
                                            {val.category}
                                        </td>
                                        <td>
                                            {val.description}
                                        </td>
                                        <td>
                                            {val.price}
                                        </td>
                                        <td>
                                            {val.saleprice}
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            "No data available"


                    }

                </tbody>
            </table>

           

        </>
    )

}