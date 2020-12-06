/* eslint-disable */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginReducer from 'main/Login/store/reducers'
import DashboardReducer from 'main/Dashboard/store/reducers'

export default (history) =>
    combineReducers({
        loginReducer,
        DashboardReducer,
        router: connectRouter(history),
    });
