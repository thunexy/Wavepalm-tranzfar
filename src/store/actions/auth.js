import {LOGIN_STATE, USER_CHECK} from "./actionTypes";

export const isLoggedIn = (statusBool, email, country) => {
    return {
        type: LOGIN_STATE,
        isLoggedIn: statusBool,
        email, country
    }
};

export const checkUserDetails = () => {
    return {
        type: USER_CHECK,
    }
}
