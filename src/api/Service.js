import axios from 'axios';

class Service {
    constructor(JWT) {
        this.JWT = JWT;

        this.axios = axios.create({
            baseURL: process.env.VUE_APP_BACKEND_URL,
            headers: {
                Authorization: `Bearer ${JWT}`,
            }
        });
    }
}

export default Service;
