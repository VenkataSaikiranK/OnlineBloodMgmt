import React, {  useState } from "react";
import axios from "axios";



export default function Search() {
    const [city, setCity] = useState("Halifax");
    const [bloodGroup, setBloodGroup] = useState("");
    const validateData = () => {
        console.log("in validate");
        var data = {
            city: city,
            bloodGroup: bloodGroup,
        };
        axios.post("http://localhost:9000/searchUsers", data).then((response) => {
           console.log("in axios post");
           console.log("data is" + data);
            console.log(response);
        });
    }

    return(
        <div>
        <div className="mt-4 mb-4 w-50">
            <label>City:</label>
            <div className="mb-4">
                <select className="form-select" value={city} onChange={(e) => {
                    setCity(e.target.value);
                }} >
                    <option value="halifax">Halifax</option>
                    <option value="vancouver">Vancouver</option>
                    <option value="ottawa">Ottawa</option>
                    <option value="toronto">Toronto</option>
                    <option value="calgary">Calgary</option>
                </select>
            </div>
        </div>

            <div className="mt-4 mb-4 w-50">
                <label>Blood Group:</label>
                <div className="mb-4">
                    <select className="form-select" value={bloodGroup} onChange={(e) => {
                        setBloodGroup(e.target.value);
                    }} >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
            </div>
    <div>
        <button className="btn btn-primary"  type="button" onClick={validateData}>Search</button>
    </div>
        </div>
    )
}