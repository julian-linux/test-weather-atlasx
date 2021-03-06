import actionTypes from 'constants/actionTypes';

export default {
    appRequestInit: () => ({
        type: actionTypes.APP.REQUEST.INIT,
    }),
    appRequestSuccess: success => ({
        success,
        type: actionTypes.APP.REQUEST.SUCCESS,
    }),
    appRequestError: error => ({
        error,
        type: actionTypes.APP.REQUEST.ERROR,
    }),
    appRequestCityInit: selectedCity => ({
        selectedCity,
        type: actionTypes.APP.CITY.REQUEST.INIT,
    }),
    appRequestCitySuccess: success => ({
        success,
        type: actionTypes.APP.CITY.REQUEST.SUCCESS,
    }),
    appRequestCityError: error => ({
        error,
        type: actionTypes.APP.CITY.REQUEST.ERROR,
    }),
    appAddFilteredCity: city => ({
        city,
        type: actionTypes.APP.CITY.FILTER.ADD,
    }),
    appRemoveFilteredCity: city => ({
        city,
        type: actionTypes.APP.CITY.FILTER.REMOVE,
    }),
    appChangeTemp: temp => ({
        temp,
        type: actionTypes.APP.CHANGETEMP,
    }),
};
