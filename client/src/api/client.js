import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_SERVER
});


export default client;
