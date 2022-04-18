import axios from "axios";
import OAuth from "./oauth";
import urls from "./urls";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const endpoints = {
  oauth: OAuth(api),
  urls: urls(api),
};

export default endpoints;
