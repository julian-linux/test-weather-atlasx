import { get } from 'config/services';
import cities from 'config/cities';
import Lockr from 'lockr';

import actionCreator from './actionCreators/app';

const requestCity = async (city, dispatch) => {
    console.log("will request city", city);
    try {
        const params = {
            id: city,
        };
        const response = await get('weather.forecast', params);
        console.log("response", response);
        dispatch(actionCreator.appRequestCitySuccess(response.body.list));
    } catch (error) {
        console.log("error", error);
        dispatch(actionCreator.appRequestCityError(error));
    }
};

const requestCities = async (dispatch, getState) => {
    try {
        const params = {
            id: cities.map(city => city.id).join(','),
        };

        const response = await get('weather.getAll', params);

        dispatch(actionCreator.appRequestSuccess(response.body.list));
        selectCity(Lockr.get('selectedCity'))(dispatch, getState);// eslint-disable-line
    } catch (error) {
        dispatch(actionCreator.appRequestError(error));
    }
};

const init = () => (dispatch, getState) => {
    const citiesList = Lockr.get('cities');
    if (!citiesList) {
        const { app } = getState();
        if (!app.isFetching) {
            dispatch(actionCreator.appRequestInit());
            requestCities(dispatch, getState);
        }
    } else {
        dispatch(actionCreator.appRequestSuccess(citiesList));
        selectCity(Lockr.get('selectedCity'))(dispatch, getState);// eslint-disable-line
    }
};

const selectCity = city => (dispatch, getState) => {
    const { app } = getState();
    console.log("app.isFetchingCity", app.isFetchingCity);
    if (!app.isFetchingCity) {
        dispatch(actionCreator.appRequestCityInit(city));
        requestCity(city, dispatch);
    }
};

export { init, selectCity };// eslint-disable-line
