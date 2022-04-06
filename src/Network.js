import { useNavigate } from "react-router-dom";

function isAuthenticated() {
  var userObj = localStorage.getItem("token");
  if (userObj && JSON.parse(userObj) && JSON.parse(userObj).data) {
    //return userObj;
    return JSON.parse(userObj).data[0];
  } else {
    return false;
  }
}

function setTokenOnLogOut() {
  localStorage.removeItem("token");
}

export { isAuthenticated, setTokenOnLogOut };
