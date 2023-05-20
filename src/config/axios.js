import axios from "axios";
import general from "@/config/general";


const api = axios.create({
    baseURL: general.baseURL,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export default api;