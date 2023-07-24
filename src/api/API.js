import Auth from './Auth';
import User from './User';
import Groups from './Groups';
import Button from './Button';

class API {
    constructor(JWT) {
        this.setJWT(JWT);
    }

    setJWT(JWT) {
        this.JWT = JWT;
        this.auth = new Auth(JWT);
        this.user = new User(JWT);
        this.groups = new Groups(JWT);
        this.button = new Button(JWT);
    }
}

export default new API();
