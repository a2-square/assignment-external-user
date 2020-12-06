import { apiPost } from 'api/apiUtils'

const EXTERNAL_USER = "EXTERNAL_USER"

const getExternalUsers = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = apiPost('externalUserList', payload);
            request.then(response => {
                const { data } = response.data;
                dispatch({
                    type: EXTERNAL_USER,
                    data
                })
                resolve(data);
            }).catch((error) => {
                reject(error.response.data);
            })
        })
    }
}

export { 
    EXTERNAL_USER,
    getExternalUsers 
}