function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function isPhone(window) {
    if (window.width > 800) {
        return false
    } else {
        return true
    }
}
export const initialState = {
    user: JSON.parse(
        window.localStorage.getItem('userLocal')),
    dark: JSON.parse(
        window.localStorage.getItem('darkLocal')),
    modal: false,
    spotify: false,
    spotify_id: '3bJIhwwa2QUDB5h2OCvnGc',
    phone: isPhone(getWindowDimensions())
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_DARK":
            return {
                ...state,
                dark: action.dark,
            };
        case "SET_MODAL":
            return {
                ...state,
                modal: action.modal,
            };
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        case "SET_SPOTIFY_ID":
            return {
                ...state,
                spotify_id: action.spotify_id,
            };

        default:
            return state;
    }
};

export default reducer;