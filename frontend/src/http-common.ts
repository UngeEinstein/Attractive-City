import axios from "axios";

export default axios.create({
  baseURL: [
    "ac-testenv-328009.firebaseapp.com",
    "ac-testenv-328009.web.app",
    "attractive-city.firebaseapp.com",
    "attractive-city.web.app",
  ].includes(window.location.hostname)
    ? "https://attractive-city-wyncxw6l6a-ew.a.run.app"
    : "http://localhost:3001",
});
