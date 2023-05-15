import axios from 'axios' 

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5000/api/ideas'
        this._user = JSON.parse(localStorage.getItem('userInfo'));
    }

    getConfig() {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${this._user.token}`
            }
        }
        return config
    }

    getIdeas() {
        return axios.get(this._apiUrl);
    }

    createIdea(data) {
        const config = this.getConfig();
        return axios.post(this._apiUrl, data, config)
    }

    deleteIdea(id) {
        const config = this.getConfig();
        return axios.delete(`${this._apiUrl}/${id}`, config)        
    }

    updateIdea(id, data) {
        const config = this.getConfig();
        return axios.put(`${this._apiUrl}/${id}`, data, config);
    }
}

export default new IdeasApi();