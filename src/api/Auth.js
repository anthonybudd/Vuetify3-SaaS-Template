import Service from './Service';

class Auth extends Service {
    login(auth) {
        return this.axios.post(`/auth/login`, auth);
    }

    signUp(signUp) {
        return this.axios.post(`/auth/sign-up`, signUp);
    }

    verifyEmail(emailVerificationKey) {
        return this.axios.get(`/auth/verify-email/${emailVerificationKey}`);
    }

    authcheck() {
        return this.axios.get('/_authcheck');
    }
}

export default Auth;
