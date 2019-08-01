import {createStore, combineReducers} from "redux";
import authReducer from "./reducers/auth";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    let store = createStore(pReducer);
    let persistor = persistStore(store);
    return {store, persistor} ;
};

export default configureStore;