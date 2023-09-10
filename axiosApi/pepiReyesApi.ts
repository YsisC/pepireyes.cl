import axios from 'axios';



const pepireyesApi = axios.create({
    baseURL: '/api'
});


export default pepireyesApi;