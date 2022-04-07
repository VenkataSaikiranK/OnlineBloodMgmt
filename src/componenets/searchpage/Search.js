import React, { useState } from "react";
import axios from "axios";
import EmailForm from "../EmailForm";

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
    axios.post("http://3.239.66.148:5000/searchUsers", data).then((response) => {
      //console.log(response.data);
      let sendData = {
        data: response.data,
      };
      console.log("before");
      axios.post("http://52.3.82.177:5000/recommend/", sendData).then((res) => {
        console.log("in second post call");
        console.log(res.data["data"]);
        if (res.data["data"]) {
          setUser(res.data["data"]);
          displayUsers();
        } else {
          return <p> There are no users available</p>;
        }
      });
    });
  };
  function users() {
    return user;
  }
  function displayUsers() {
    if (user) {
      return (
        <>
          <div className="card" style={{ width: "18rem" }}>
            {users().map((data, id) => {
              let custStyle = "card-body";
              if (data.willing === 1) {
                custStyle = "card-body bg-info";
              }
              return (
                <div className={custStyle} key={id}>
                  <h5 className="card-title">
                    {" "}
                    {data.firstname} {data.lastname}
                  </h5>
                  <p className="card-text">{data.email}</p>
                  <p className="card-text">{data.phone}</p>
                </div>
              );
            })}
            ;
            
          </div>
          <h3>ML Generated info above - Highlighted users are most likely to donate blood</h3>
        </>
      );
    }
  }
  return (
    <div>
      <div className="mt-4 mb-4 w-50">
        <label>City:</label>
        <div className="mb-4">
          <select
            className="form-select"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
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
          <select
            className="form-select"
            value={bloodGroup}
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
          >
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
        <button
          className="btn btn-primary"
          type="button"
          onClick={validateData}
        >
          Search
        </button>
      </div>
      {error ? (
        <div style={{ marginLeft: "5px" }}>{error}</div>
      ) : (
        displayUsers()
      )}
      <div className="mt-4 mb-4 w-50">
        <EmailForm />
      </div>
    </div>
  );
}
