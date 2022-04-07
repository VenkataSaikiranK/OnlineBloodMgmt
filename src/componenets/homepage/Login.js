import React, { useState } from "react";
import Userpool from "../../cognito/Userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Amplify, Auth } from "aws-amplify";
import { isAuthenticated } from "../../Network";

export default function Login() {
  //handle login form using aws Cognito
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    //handle sign in from rds
    axios
      .post("http://3.239.66.148:5000/login", formData)
      .then(function (response) {
        console.log(response);
        if (response.data && response.status == "200") {
          //handle sign in from cognito
          alert("Successfully logged in");
          localStorage.setItem("token", JSON.stringify(response));
          console.log(isAuthenticated().email);
          navigate("/LandingPage");
        } else {
          alert("Invalid credentials/User not found");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div>
      <h2>Login page</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-4">
            <input
              class="form-control"
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                updateFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-4">
            <input
              class="form-control"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                updateFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
