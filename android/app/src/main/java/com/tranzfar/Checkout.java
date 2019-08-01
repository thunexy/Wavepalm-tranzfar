package com.tranzfar;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.android.volley.VolleyError;
import com.checkout.android_sdk.Models.BillingModel;
import com.checkout.android_sdk.Models.PhoneModel;
import com.checkout.android_sdk.Request.CardTokenisationRequest;
import com.checkout.android_sdk.Response.CardTokenisationFail;
import com.checkout.android_sdk.Response.CardTokenisationResponse;
import com.checkout.android_sdk.Utils.Environment;
import com.checkout.android_sdk.CheckoutAPIClient;

public class Checkout extends ReactContextBaseJavaModule {

    private CheckoutAPIClient mCheckoutAPIClient;
    private ReactApplicationContext context;

    public Checkout(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }


    private String displayMessage(String title, String message) {
        return message;
    }

    @ReactMethod
    public void show(Callback successCallback) {


        mCheckoutAPIClient = new CheckoutAPIClient(
                context,
                "pk_test_97d08ba7-d301-45e8-b489-84a9d5a79c8f",
                Environment.SANDBOX
        );
        mCheckoutAPIClient.setTokenListener(new CheckoutAPIClient.OnTokenGenerated() {

                @Override
                public void onTokenGenerated(CardTokenisationResponse token) {
                    successCallback.invoke(token.getId());
                }

                @Override
                public void onError(CardTokenisationFail error) {
                    successCallback.invoke(error.getEventId());
                }

                @Override
                public void onNetworkError(VolleyError error) {
                    // your network error
                }
            }

        );


        // Pass the paylod and generate the token
        mCheckoutAPIClient.generateToken(
            new CardTokenisationRequest(
                "4242424242424242",
                "name",
                "06",
                "25",
                "100",
                new BillingModel(
                    "address line 1",
                    "address line 2",
                    "postcode",
                    "UK",
                    "city",
                    "state",
                    new PhoneModel(
                        "+44",
                        "07123456789"
                    )
                )
            )
        );

    }


    @Override
    public String getName() {
        return "Checkout";
    }


}