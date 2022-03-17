import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://someendpoint.free.beeceptor.com/'
});

export default instance;