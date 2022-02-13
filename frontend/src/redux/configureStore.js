import { createStore } from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const appAuth = secureLS.get('app-auth');

    let stateInLocalStorage = {
        isLoggedIn  : false,
        username    : undefined,
        email       : undefined,
        name        : undefined,
        password    : undefined,
        role        : undefined
    };

    if (appAuth) {
        return appAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLS.set('app-auth', newState);
}

const configureStore = () => {
    const store = createStore(authReducer, getStateFromStorage());

    // ,applyMiddleware(thunk)
    store.subscribe(() => {
        updateStateInStorage(store.getState());
    })

    return store;
}

export default configureStore;