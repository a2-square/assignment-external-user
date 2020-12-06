import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from 'main/Login/store/actions'
import { LOGOUT } from 'main/Common/store/actions'

const INITIAL_STATE = {
    logging: false,
    user: null,
    loginError: null
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                logging: true,
                user: null,
                loginError: null
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                logging: false,
                user: action.user,
                loginError: null
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                user: null,
                logging: false,
                loginError: action.err
            }
        case LOGOUT:
            return {
                ...state,
                logging: false,
                user: null,
                loginError: null
            }
        default:
            return state;
    }
};

export default LoginReducer;
