import {LOGIN_STATE, USER_CHECK} from "./actionTypes";

export const isLoggedIn = (statusBool, email, country, others) => {
    return {
        type: LOGIN_STATE,
        isLoggedIn: statusBool,
        email, country, others
    }
};

export const checkUserDetails = () => {
    return {
        type: USER_CHECK,
    }
}
