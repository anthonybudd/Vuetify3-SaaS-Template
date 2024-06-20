import Service from './Service';

class Group extends Service {
    get(groupID) {
        return this.axios.get(`/groups/${groupID}?with=users`);
    }

    update(groupID, group) {
        return this.axios.post(`/groups/${groupID}`, group);
    }

    invite(groupID, email) {
        return this.axios.post(`/groups/${groupID}`, { email });
    }

    setRole(groupID, userID, role) {
        return this.axios.post(`/groups/${groupID}/users/${userID}/set-role`, { role });
    }

    delete(groupID, userID) {
        return this.axios.delete(`/groups/${groupID}/users/${userID}`);
    }
}

export default Group;
