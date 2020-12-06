import { apiPost, apiGet } from 'api/apiUtils'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

const currentUserDetails = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = apiGet('user');
            request.then(response => {
                const { data } = response.data;
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: data,
                })
                resolve(data);
            }).catch((error) => {
                dispatch({
                    type: LOGIN_USER_ERROR,
                    err: error.response.data.message
                })
                reject(error.response.data);
            })
        })
    }
}

const login = (loginDetails) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({ type: LOGIN_USER });
            const request = apiPost('login', loginDetails);
            request.then((response) => {
                const { data } = response.data;
                localStorage.setItem('token', data.token);
                resolve(data)
            }).catch((error) => {
                reject(error.response.data);
            })
        });
    }
};


export { login, currentUserDetails }