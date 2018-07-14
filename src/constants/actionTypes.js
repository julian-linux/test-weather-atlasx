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
        },
    },
}, '_');

export default actionTypes;
