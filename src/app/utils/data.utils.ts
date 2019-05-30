const axios = require('axios');
import { log } from '../utils/error.utils';

export const apiCall = async function (url, payload, auth, method = 'POST') {

    try {

        let headers = {
            Accept: 'application/json;charset=UTF-8',
            authorization: auth || ""
        };

        log("info", {
            msg: "Routing",
            url: url,
            payload: payload
        });

        let apiOptions = {
            url: url,
            method: method,
            headers: headers,
            responseType: 'json',
            data: payload
        };
        let response = await axios(apiOptions);

        return {
            err: null,
            response: response.data
        };
    } catch (err) {
        console.log("error in routing url", err);

        log("error", {
            message: "Error in routing url",
            url: url,
            err: err
        });

        return {
            err: err,
            response: null
        };
    }
};
