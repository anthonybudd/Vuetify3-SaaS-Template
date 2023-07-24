import Service from './Service';

class Auth extends Service {
    login(data) {
        return this.axios.post('/auth/login', data);
    }

    signUp(data) {
        return this.axios.post('/auth/sign-up', data);
    }

    getUserByInviteKey(inviteKey) {
        return this.axios.get(`/auth/get-user-by-invite-key/${inviteKey}`);
    }

    invite(data) {
        return this.axios.post(`/auth/invite`, data);
    }

    forgot(data) {
        return this.axios.post('/auth/forgot', data);
    }

    getUserByResetKey(passwordResetKey) {
        return this.axios.get(`/auth/get-user-by-reset-key/${passwordResetKey}`);
    }

    reset(data) {
        return this.axios.post('/auth/reset', data);
    }
}

export default Auth;
