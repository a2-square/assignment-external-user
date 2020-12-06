import { apiConfig, apiKeys } from "./apiConfig";
import axios from "axios";

export const getUrlByKey = (key) => {
    return apiConfig + apiKeys[key];
};

export const apiGet = (key, args) => {
    if (typeof args === 'string') {
        return instance.get(getUrlByKey(key) + args);
    } else {
        return instance.get(getUrlByKey(key), {
            data: args,
        });
    }

};

export const apiPost = (key, args) => {
    return instance.post(
        getUrlByKey(key),
        args,
    );
};

const defaultOptions = {
    baseURL: apiConfig,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
}

// Create instance
let instance = axios.create(defaultOptions)

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
})
