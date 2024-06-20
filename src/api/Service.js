import axios from 'axios';

class Service {
    constructor(JWT) {
        this.JWT = JWT;

        this.axios = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            headers: {
                Authorization: `Bearer ${JWT}`,
            }
        });
    }
}

export default Service;
