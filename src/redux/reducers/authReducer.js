import {
    DELETE_SUBSCRIPTIONS,
    EDIT_PASSWORD, EDIT_SUBSCRIPTIONS,
    EDIT_USER, GET_SUBSCRIPTIONS,
    LOGIN, LOGOUT,
    REGISTER, SUBSCRIBE,
} from "../types";

const initialState = {
    access_token: "",
    user_email: "",
    user_name: "",
    user_surname: "",
    user_id: "",
    user_type: "",
    password: "",
    subscriptions: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
            }
        case LOGIN:
            return {
                ...state,
                access_token: action.data.access_token,
                user_email: action.data.user_email,
                user_name: action.data.user_name,
                user_surname: action.data.user_surname,
                user_type: action.data.user_type,
                user_id: action.data.user_id
            }
        case LOGOUT:
            return {
                ...state,
                access_token: "",
                user_email: "",
                user_name: "",
                user_surname: "",
                user_id: "",
                user_type: "",
                password: "",
                subscriptions: []
            }
        case EDIT_USER: return {
            ...state,
            access_token: action.data.access_token,
            user_email: action.data.email,
            user_name: action.data.name,
            user_surname: action.data.surname,
        }
        case EDIT_PASSWORD: return  {
            ...state,
            access_token: action.data.access_token,
        }
        case SUBSCRIBE: return  {
            ...state,
            subscriptions: [...state.subscriptions, {...action.data, subscription_status: true}],
        }
        case GET_SUBSCRIPTIONS: return  {
            ...state,
            subscriptions: action.data,
        }
        case EDIT_SUBSCRIPTIONS:
            const subscriptions = [...state.subscriptions]
            const editedSubscription = subscriptions.find((s) => s.subscription_id === action.data.subscription_id);
            editedSubscription.subscription_status = action.data.subscription_status;

            return {
                ...state,
                subscriptions: subscriptions
            }
        case DELETE_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: [...state.subscriptions].filter((s) => s.subscription_id !== action.data.subscription_id)
            }
        default:
            return state;
    }
}
