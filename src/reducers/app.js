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
    filteredCities: [],
    filteredTemp: {
        min: 0,
        max: 0,
    },
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
        if (city.main.temp_max > max) {
            max = city.main.temp_max;
        }
    });

    return { min, max };
};

const weather = (state = initialState, action) => {
    let filteredCities;
    let filteredTemp;
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
        filteredCities = Lockr.get('filteredCities') || [];
        filteredTemp = Lockr.get('filteredTemp') || { min: 0, max: 0 };

        return {
            ...state,
            isFetching: false,
            cities,
            minTemp: temps.min,
            maxTemp: temps.max,
            selectedCity,
            filteredCities,
            filteredTemp,
        };

    case actionTypes.APP.REQUEST.ERROR:
        return {
            ...state,
            error: action.error,
        };

    case actionTypes.APP.CITY.REQUEST.INIT:
        Lockr.set('selectedCity', action.selectedCity);

        return {
            ...state,
            isFetchingCity: true,
            selectedCity: action.selectedCity,
        };

    case actionTypes.APP.CITY.REQUEST.SUCCESS:

        return {
            ...state,
            isFetchingCity: false,
            cityInfo: {
                name: state.cities.filter(city => city.id === state.selectedCity)[0].name,
                data: action.success,
            },
        };

    case actionTypes.APP.CITY.REQUEST.ERROR:
        return {
            ...state,
            error: action.error,
        };

    case actionTypes.APP.CITY.FILTER.ADD:
        filteredCities = [...state.filteredCities];
        filteredCities.push(action.city);

        Lockr.set('filteredCities', filteredCities);

        return {
            ...state,
            filteredCities,
        };

    case actionTypes.APP.CITY.FILTER.REMOVE:
        filteredCities = state.filteredCities.filter(city => city.id !== action.city.id);
        Lockr.set('filteredCities', filteredCities);

        return {
            ...state,
            filteredCities,
        };

    case actionTypes.APP.CHANGETEMP:
        filteredTemp = action.temp;
        Lockr.set('filteredTemp', filteredTemp);

        return {
            ...state,
            filteredTemp,
        };

    default:
        return { ...initialState };
    }
};

export default weather;
