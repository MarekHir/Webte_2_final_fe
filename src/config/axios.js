import axios from "axios";


const url = import.meta.env.DEV ? 'http://127.0.0.1:80' : 'https://site103.webte.fei.stuba.sk/final';

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
});

export default api;