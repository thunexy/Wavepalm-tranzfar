import {LOGIN_STATE, USER_CHECK} from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    email: "",
    country: "",
    others: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_STATE:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                email: action.email,
                country: action.country,
                others: action.others,
            };
        case USER_CHECK:
            return{
                ...state,
                email: action.email,
            };
        default:
            return state;
    }
};

export default reducer;