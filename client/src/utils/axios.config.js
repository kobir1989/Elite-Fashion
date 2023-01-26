import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

let token = null;
const persistedData = JSON.parse(localStorage.getItem('persist:root'));
if (persistedData && persistedData.auth) {
   const authData = JSON.parse(persistedData.auth);
   token = authData.token;
   console.log(token)
}

export const axiosBaseUrl = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
   headers: {
      "Content-Type": " application/x-www-form-urlencoded",
      "Authorization": `Bearer ${token}`
   }
});