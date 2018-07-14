import endPoints from 'constants/endpoints';
import { apiKey } from 'constants';
import request from 'superagent';
import _ from 'lodash';

const get = (endPoint, params = {}) => {
    const url = _.get(endPoints, endPoint);
    const endPointParams = {
        ...params,
        appid: apiKey,
    };
    return new Promise((resolve, reject) => {
        if (!url) {
            // window.console.error('EndPoint no encontrado');
            reject(new Error('EndPoint no encontrado'));
        } else {
            // return new Promise((resolve, reject) =>
            request.get(url, endPointParams)
                .then(response => resolve(response))
                .catch(error => reject(error));
        }
    });
    // if (!url) {
    //     window.console.error('EndPoint no encontrado');
    // } else {
    //     return new Promise((resolve, reject) =>
    //         request.get(url, endPointParams)
    //             .then(response => resolve(response))
    //             .catch(error => reject(error)));
    // }
    // return false;
};

export { get };// eslint-disable-line 
