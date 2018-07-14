import actionTypes from 'constants/actionTypes';
import Lockr from 'lockr';

const initialState = {
    isFetching: false,
    isFetchingCity: false,
    selectedCity: 0,
    cityInfo: {},
    cities: [],
    minTemp: 0,
    maxTemp: 0,
};

const getTemps = (cities) => {
    let min = null;
    let max = null;

    cities.forEach((city) => {
        if (min === null) {
            min = city.main.temp_min;
        }
        if (max === null) {
            max = city.main.temp_max;
        }
        if (city.main.temp_min < min) {
            min = city.main.temp_min;
        }
        if (city.main.temp_max < max) {
            max = city.main.temp_max;
        }
    });

    return { min, max };
};

const weather = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.APP.REQUEST.INIT:
        return {
            ...state,
            isFetching: true,
        };

    case actionTypes.APP.REQUEST.SUCCESS:
        const cities = action.success;
        const temps = getTemps(cities);

        if (!Lockr.get('cities')) {
            Lockr.set('cities', cities);
        }

        if (!Lockr.get('selectedCity')) {
            Lockr.set('selectedCity', cities[0].id);
        }

        const selectedCity = Lockr.get('selectedCity');

        return {
            ...state,
            isFetching: false,
            cities,
            minTemp: temps.min,
            maxTemp: temps.max,
            selectedCity,
        };

    case actionTypes.APP.REQUEST.ERROR:
        return {
            ...state,
            error: action.error,
        };

    case actionTypes.APP.CITY.REQUEST.INIT:
        return {
            ...state,
            isFetchingCity: true,
            selectedCity: action.selectedCity,
        };

    case actionTypes.APP.CITY.REQUEST.SUCCESS:
        return {
            ...state,
            isFetchingCity: false,
            cityInfo: action.success,
        };

    case actionTypes.APP.CITY.REQUEST.ERROR:
        return {
            ...state,
            error: action.error,
        };

    default:
        return { ...initialState };
    }
};

export default weather;
