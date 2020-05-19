import axios from "axios";

const instance = axios.create({
  baseURL: "https://pepperoni-9a96f.firebaseio.com/",
});

export default instance;
