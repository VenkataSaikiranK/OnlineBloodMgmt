import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Search from "../src/componenets/searchpage/Search"
import Form from "../src/componenets/homepage/Form";
import Requestblood from "../src/componenets/Requestblood";


function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Form/>} />
                <Route exact path="/search" element={<Search/>} />
                <Route exact path="/requestblood" element={<Requestblood/>} />
            </Routes>
        </BrowserRouter>
    )


}

export default AppRoutes;
