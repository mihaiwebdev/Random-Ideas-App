import axios from 'axios'

class UsersApi {
    constructor() {
        this._usersUrl = 'http://localhost:5000/api/users'
    }

    register(user) {
        return axios.post(`${this._usersUrl}`, user);
    }

    login(user) {
        return axios.post(`${this._usersUrl}/login`, user);
    }

}

export default new UsersApi();