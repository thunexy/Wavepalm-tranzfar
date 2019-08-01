import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/lib/integration/react";
import App from './App';
import React from 'react';
import configureStore from "./src/store/configureStore";
import Splash from "./src/pages/Splash";

const {store, persistor} = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor} onBeforeLift={()=>setTimeout(function(){}, 3000)}>
            <App/>
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent('Tranzfar', () => RNRedux);
