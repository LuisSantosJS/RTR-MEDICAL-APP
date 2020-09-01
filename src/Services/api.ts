import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apimedicalrtr-com-co.umbler.net'
}); 

export default api;