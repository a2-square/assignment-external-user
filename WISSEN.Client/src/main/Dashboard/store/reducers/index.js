import { EXTERNAL_USER } from 'main/Dashboard/store/actions';
import { LOGOUT } from 'main/Common/store/actions';

const INITIAL_STATE = {
    externalUser: []
};

const DashboardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXTERNAL_USER:
            return {
                ...state,
                externalUser: action.data
            }
        case LOGOUT:
            return {
                ...state,
                externalUser: []
            }
        default:
            return state;
    }
};

export default DashboardReducer;
