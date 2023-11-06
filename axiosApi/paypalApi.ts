import axios from 'axios';



const paypalApi = axios.create({
    baseURL: process.env.WEBPAY_URL || ''
});


export default paypalApi;