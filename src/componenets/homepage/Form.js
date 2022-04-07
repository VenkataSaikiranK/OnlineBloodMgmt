import React, { useState } from "react";
import Userpool from "../../cognito/Userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  const navigate = useNavigate();
  const onsubmit = (event) => {
    event.preventDefault();
    var lastname = new CognitoUserAttribute({
      Name: "lastname",
      Value: formData.lastname,
    });
    var phone_number = new CognitoUserAttribute({
      Name: "phone_number",
      Value: formData.phone_number,
    });
    var firstname = new CognitoUserAttribute({
      Name: "firstname",
      Value: formData.firstname,
    });
    var address = new CognitoUserAttribute({
      Name: "address",
      Value: formData.address,
    });
    //for cognito
    Userpool.signUp(
      formData.email,
      formData.password,
      [],
      null,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      }
    );

    console.log("Form data is", formData);
    //save other details to rds
    axios
      .post("http://3.239.66.148:5000/signup", formData)
      .then(function (response) {
        console.log(response);
        alert("Successfully registered");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [formData, updateFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    address: "",
    gender: "1",
    email: "",
    phone_number: "",
    password: "",
    blood: "O+",
    timesdonated: 0,
    yon: "1",
  });
  function updateFname(event) {
    updateFormData({ ...formData, firstname: event.target.value });
  }
  function updateLname(event) {
    updateFormData({ ...formData, lastname: event.target.value });
  }
  function updateAge(event) {
    updateFormData({ ...formData, age: event.target.value });
  }
  function updateAddress(event) {
    updateFormData({ ...formData, address: event.target.value });
  }
  function updateGender(event) {
    updateFormData({ ...formData, gender: event.target.value });
  }
  function updateEmail(event) {
    updateFormData({ ...formData, email: event.target.value });
  }
  function updatephone(event) {
    updateFormData({ ...formData, phone_number: event.target.value });
  }
  function updatePassword(event) {
    updateFormData({ ...formData, password: event.target.value });
  }
  function updateBlood(event) {
    updateFormData({ ...formData, blood: event.target.value });
  }
  function updateTd(event) {
    updateFormData({ ...formData, timesdonated: event.target.value });
  }
  function updateYon(event) {
    updateFormData({ ...formData, yon: event.target.value });
  }

  return (
    <div>
      <h2 style={{marginLeft:5+"px"}}>Be a helping hand</h2>
      <h5 style={{ "border-bottom": "5px solid #ddd", marginLeft:5+"px" }}>
        Welcome to Canada's biggest online blood bank system
      </h5>
      <h2 style={{ "margin-left": "30px" }}>Register as - Donor</h2>
      <button
        type="submit"
        className="btn btn-primary"
        value="login"
        style={{float:"right"}}
        onClick={() => {
          navigate("/login");
        }}
      >
        Don't have an account- Login
      </button>

      <form onSubmit={onsubmit} post="/home" style={{width: "80%",padding: "32px",border: "10px solid #F6F6F6"}}>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">First Name</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              name="firstname"
              onChange={updateFname}
              value={formData.firstname}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Last Name</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              name="lastname"
              onChange={updateLname}
              value={formData.lastname}
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Age</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              name="age"
              onChange={updateAge}
              value={formData.age}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">City</label>
          <div class="col-sm-4">
            <textarea
              name="address"
              class="form-control"
              onChange={updateAddress}
              value={formData.address}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Gender</label>
          <div class="col-sm-4">
            <select
              class="form-select"
              name="gender"
              onChange={updateGender}
              value={formData.gender}
              id="mf"
            >
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Email address</label>
          <div class="col-sm-4">
            <input
              type="email"
              class="form-control"
              name="email"
              onChange={updateEmail}
              value={formData.email}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Phone</label>
          <div class="col-sm-4">
            <input
              type="text"
              name="phone_number"
              class="form-control"
              value={formData.phone_number}
              onChange={updatephone}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-4">
            <input
              type="password"
              class="form-control"
              name="password"
              value={formData.password}
              onChange={updatePassword}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Choose your blood type</label>
          <div class="col-sm-4">
            <select
              name="Blood_type"
              class="form-select"
              onChange={updateBlood}
              value={formData.blood}
              id="bt"
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">
            Number of times you have donated blood
          </label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              name="nbd"
              onChange={updateTd}
              value={formData.td}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="blood">
            If you were asked to donate blood now. will you donate ?
          </label>
          <div class="col-sm-4">
            <select
              name="yon"
              id="yon"
              class="form-select"
              onChange={updateYon}
              value={formData.yon}
            >
              <option value="1">yes</option>
              <option value="0">no</option>
            </select>
          </div>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            name="checkbox"
            id="checkbox"
            style={{ float: "inherit" }}
            required
          />{" "}
          <label class="form-check-label">
            I agree all statements in terms of service .
          </label>
        </div>

        <button id="sub_btn" type="submit" class="btn btn-primary">
          Register
        </button>
      </form>
      {/* <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer> */}
    </div>
  );
}

export default Form;
