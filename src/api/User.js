import Service from './Service';

class User extends Service {
    get() {
        return this.axios.get('/user');
    }

    update(user) {
        return this.axios.post(`/user`, user);
    }

    resendVerificationEmail() {
        return this.axios.post(`/user/resend-verification-email`);
    }

    updatePassword(password) {
        return this.axios.post(`/user/update-password`, password);
    }
}

export default User;
