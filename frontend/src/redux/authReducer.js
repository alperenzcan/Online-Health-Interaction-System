const defaultState = {
    isLoggedIn  : false,
    username    : undefined,
    email       : undefined,
    name        : undefined,
    password    : undefined,
    role        : undefined
}

const authReducer = (state = {...defaultState}, action) => {
    if(action.type === 'logout-success' ) {
        return defaultState
    }else if (action.type === 'login-success'){
        return {
            ...action.payload,
            isLoggedIn:true
        }
    }
    return state;
}

export default authReducer;