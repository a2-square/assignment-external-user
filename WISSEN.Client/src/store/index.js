import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunkMiddleware from 'redux-thunk';
import createRootReducer from './combineReducers';

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginReducer'],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export default function configureStore(preloadedState) {
    const store = createStore(
        persistedReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunkMiddleware, middleware)),
    );

    let persistor = persistStore(store);

    return { store, persistor, history };
}
