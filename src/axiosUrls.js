import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://50.19.67.205:4000/",
});

export default axios;
