import axios from 'axios';

const api = axios.create({
    baseURL: 'https://betheheroapp-backend.herokuapp.com/',
})

export default api;