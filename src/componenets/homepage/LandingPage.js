import React, { useState } from "react";
import Userpool from "../../cognito/Userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAuthenticated, setTokenOnLogOut } from "../../Network";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login page</h2>
      <h5 style={{ "border-bottom": "5px solid #ddd" }}>
        Welcome to Canada's biggest online blood bank system
      </h5>
      <button
        type="submit"
        className="btn btn-primary"
        value="search"
        onClick={() => {
          navigate("/search");
        }}
      >
        Search
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        value="requestblood"
        onClick={() => {
          navigate("/requestblood");
        }}
      >
        Request blood
      </button>
      {isAuthenticated() && (
        <button
          variant="danger"
          className="btn btn-primary"
          onClick={() => setTokenOnLogOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
}
