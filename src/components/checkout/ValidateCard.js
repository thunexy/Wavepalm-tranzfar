import {
    NativeModules
} from "react-native";
export function validateCard (cardNumber, cardName, month, year, cvv, callback) {
    let status = false, message = "";
    NativeModules.Checkout.generateToken(cardNumber, cardName, month, year, cvv, (successMsg) => {
        status = true;
        callback(status);
    }, errorMessage => {
        status = false;
        message = "This card could not be validated!";
        callback(status);
    });

};