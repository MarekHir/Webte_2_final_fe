import axios from "axios";


const url = import.meta.env.DEV ? 'http://0.0.0.0:80' : 'https://site103.webte.fei.stuba.sk/final';

const api = axios.create({
    baseURL: url + '/api',
});

api.defaults.withCredentials = true;

export const createCookie = async () => {
    await api.get( url + '/sanctum/csrf-cookie');
}

export default api;