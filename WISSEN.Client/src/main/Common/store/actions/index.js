export const LOGOUT = "LOGOUT"

const logOut = () => {
    localStorage.removeItem('token');
    return (dispatch => {
        dispatch({ type: LOGOUT })
    })
}

const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export { logOut, isAuthenticated }