import keyMirrorNested from 'keymirror-nested';

const actionTypes = keyMirrorNested({
    APP: {
        REQUEST: {
            INIT: null,
            SUCCESS: null,
            ERROR: null,
        },
        CITY: {
            REQUEST: {
                INIT: null,
                SUCCESS: null,
                ERROR: null,
            },
            FILTER: {
                ADD: null,
                REMOVE: null,
            },
        },
        CHANGETEMP: null,
    },
}, '_');

export default actionTypes;
