import { apiPost } from 'api/apiUtils'
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'



const register = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = apiPost('register', data);
            request.then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data);
            })
        });
    }
};


export { register }