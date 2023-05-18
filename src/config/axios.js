import axios from "axios";


const url = import.meta.env.DEV ? 'http://localhost:8000' : 'https://site103.webte.fei.stuba.sk/final';

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export default api;