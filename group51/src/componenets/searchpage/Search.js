import React, {  useState } from "react";
import axios from "axios";



export default function Search() {
    const [city, setCity] = useState("Halifax");
    const [bloodGroup, setBloodGroup] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState("");


    const validateData = () => {
        console.log("in validate");
        var data = {
            city: city,
            bloodGroup: bloodGroup,
        };
        axios.post("http://localhost:9000/searchUsers", data).then((response) => {
            console.log(response.data);
            if(response.data){
                setUser(response.data);
                displayUsers()

            }else{
                return(
                    <p> There are no users available</p>
                )
            }

        });
    }
    function users(){
        return user;
    }
    function displayUsers(){
        if(user){
            return(
                <>

                    <div className="card" style={{ width: "18rem" }}>
                        {users().map((data, id) => (
                            <div className="card-body">
                                <h5 className="card-title"> {data.firstname} {data.lastname}</h5>
                                <p className="card-text">{data.email}</p>
                                <p className="card-text">{data.phone}</p>
                            </div>
                        ))};
                    </div>

                </>
            )
        }

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
            {error ? (
                <div style={{ marginLeft: "5px" }}>
                   {error}
                </div>
            ) : (
                displayUsers()
            )}

        </div>
    )
}