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
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY0MDY1OTY2ZjE2NTFmNDgzZjEyOCIsImlhdCI6MTY4Mzk5NDQ4MSwiZXhwIjoxNjg2NTg2NDgxfQ.nT6__EoObVcIcb0glcNJnc2kzwwRs_Sg9u4xkCaN410`
            }
        }
        return axios.post(this._apiUrl, data, config)
    }
}

export default new IdeasApi();