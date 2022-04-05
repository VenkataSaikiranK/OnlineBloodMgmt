import React, { useState } from "react";
import Userpool from "../cognito/Userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
function Form() {
  const onsubmit = (event) => {
    event.preventDefault();
    var Lname = new CognitoUserAttribute({
      Name: "family_name",
      Value: formData.lname,
    });
    var Phone = new CognitoUserAttribute({
      Name: "phone_number",
      Value: formData.phone,
    });
    var Fname = new CognitoUserAttribute({
      Name: "given_name",
      Value: formData.fname,
    });

    Userpool.signUp(
      formData.email,
      formData.password,
      [Lname, Phone, Fname],
      null,
      (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      }
    );
  };
  const [formData, updateFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    Address: "",
    gender: "1",
    email: "",
    phone: "",
    password: "",
    blood: "O+",
    td: "0",
    yon: "",
  });
  function updateFname(event) {
    updateFormData({ ...formData, fname: event.target.value });
  }
  function updateLname(event) {
    updateFormData({ ...formData, lname: event.target.value });
  }
  function updateAge(event) {
    updateFormData({ ...formData, age: event.target.value });
  }
  function updateAddress(event) {
    updateFormData({ ...formData, Address: event.target.value });
  }
  function updateGender(event) {
    updateFormData({ ...formData, gender: event.target.value });
  }
  function updateEmail(event) {
    updateFormData({ ...formData, email: event.target.value });
  }
  function updatephone(event) {
    updateFormData({ ...formData, phone: event.target.value });
  }
  function updatePassword(event) {
    updateFormData({ ...formData, password: event.target.value });
  }
  function updateBlood(event) {
    updateFormData({ ...formData, blood: event.target.value });
  }
  function updateTd(event) {
    updateFormData({ ...formData, td: event.target.value });
  }
  function updateYon(event) {
    updateFormData({ ...formData, yon: event.target.value });
  }

  return (
    <div>
      <h2>Be a helping hand</h2>
      <h5 style={{ "border-bottom": "5px solid #ddd" }}>
        Welcome to Canada's biggest online blood bank system
      </h5>
      <h2 style={{ "margin-left": "30px" }}>Register as - Donor</h2>
      <form onSubmit={onsubmit} post="/home">
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">First Name</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              name="first_name"
              onChange={updateFname}
              value={formData.fname}
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
              name="last_name"
              onChange={updateLname}
              value={formData.lname}
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
              name="Age"
              onChange={updateAge}
              value={formData.age}
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Address</label>
          <div class="col-sm-4">
            <textarea
              name="Address"
              class="form-control"
              onChange={updateAddress}
              value={formData.Address}
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
              name="phone"
              class="form-control"
              value={formData.phone}
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
              name="yesorno"
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
