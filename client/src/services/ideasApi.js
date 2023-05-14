import axios from 'axios' 

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5000/api/ideas'
    }

    getIdeas() {
        return axios.get(this._apiUrl);
    }

    createIdea(data) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY0MDY1OTY2ZjE2NTFmNDgzZjEyOCIsImlhdCI6MTY4NDA0NjYyNywiZXhwIjoxNjg2NjM4NjI3fQ.s7lALHKIpTgq9we1sS8YYiPiANDs_exz7vJytocu4ZQ`
            }
        }
        return axios.post(this._apiUrl, data, config)
    }

    deleteIdea(id) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY0MDY1OTY2ZjE2NTFmNDgzZjEyOCIsImlhdCI6MTY4NDA0NjYyNywiZXhwIjoxNjg2NjM4NjI3fQ.s7lALHKIpTgq9we1sS8YYiPiANDs_exz7vJytocu4ZQ`
            }
        }
        return axios.delete(`${this._apiUrl}/${id}`, config)        
    }

    updateIdea(id, data) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY0MDY1OTY2ZjE2NTFmNDgzZjEyOCIsImlhdCI6MTY4NDA0NjYyNywiZXhwIjoxNjg2NjM4NjI3fQ.s7lALHKIpTgq9we1sS8YYiPiANDs_exz7vJytocu4ZQ`
            }            
        }
        return axios.put(`${this._apiUrl}/${id}`, data, config);
    }
}

export default new IdeasApi();