import Service from './Service';

class User extends Service {
    get() {
        return this.axios.post('/user');
    }
}

export default User;
