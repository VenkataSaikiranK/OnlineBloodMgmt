import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Search from "../src/componenets/searchpage/Search"
import Form from "../src/componenets/homepage/Form";



function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Form/>} />
                <Route exact path="/search" element={<Search/>} />
            </Routes>
        </BrowserRouter>
    )


}

export default AppRoutes;
