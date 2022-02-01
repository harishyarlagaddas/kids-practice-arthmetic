import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import loginReducer from "../reducers/loginReducer"
import storage from 'redux-persist/lib/storage'
import { loginMiddleware } from "../middleware/loginMiddleware";
import registrationReducer from "../reducers/registrationReducer";
import { registrationMiddleware } from "../middleware/registrationMiddleware";

function configureStore(initialState = {}) {
    
    const rootPersistConfig = {
        key: 'root',
        storage: storage,
        blacklist: ['registration']
    }

    const loginPersistConfig = {
        key: 'login',
        storage: storage,
        whitelist: ['accessToken'],
    }

    const rootReducer = combineReducers( {
        login: persistReducer(loginPersistConfig, loginReducer),
        registration: registrationReducer
    })

    const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
    const middlewareEnhancer = applyMiddleware(loginMiddleware, registrationMiddleware)

    let store = createStore(persistedReducer, middlewareEnhancer)
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore