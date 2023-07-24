import Service from './Service';

class Button extends Service {
    get(groupID) {
        return this.axios.get(`/button/by-group/${groupID}`);
    }

    click(buttonID) {
        return this.axios.post(`/button/${buttonID}/click`);
    }
}

export default Button;
