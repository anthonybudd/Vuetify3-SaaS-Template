import Service from './Service';

class Groups extends Service {
    get(groupID) {
        return this.axios.get(`/groups/${groupID}?with=users`);
    }

    update(groupID, group) {
        return this.axios.post(`/groups/${groupID}`, group);
    }

    invite(groupID, email) {
        return this.axios.post(`/groups/${groupID}/users/invite`, { email });
    }

    removeUser(groupID, userID) {
        return this.axios.delete(`/groups/${groupID}/users/${userID}`);
    }
}

export default Groups;
