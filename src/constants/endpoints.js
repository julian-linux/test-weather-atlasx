import { baseEnpointUrl } from 'constants';

const base = `${baseEnpointUrl}`;

export default {
    weather: {
        getAll: `${base}group`,
        forecast: `${base}forecast`,
    },
};
