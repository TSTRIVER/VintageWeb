import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,LOADER_FAIL,LOADER_SUCCESS,LOADER_REQUEST,LOGOUT_FAIL,LOGOUT_SUCCESS} from "../constants/userConstants";

export const userReducer = (state = {user:{}},action) =>{
    switch(action.type){
        case LOGIN_REQUEST:
            case USER_REGISTER_REQUEST:
             case LOADER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
         case LOGIN_SUCCESS:
            case USER_REGISTER_SUCCESS:
             case LOADER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
            case LOGOUT_SUCCESS:
                return{
                    loading:false,
                    isAuthenticated:false,
                    user:null
                }
        case LOGIN_FAIL:
            case USER_REGISTER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user:null,
                error: action.payload
            }
        case LOADER_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                user:null,
                error: action.payload
            }
        case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        case CLEAR_ERRORS:
                return{
                   ...state,
                   error: null
                };
        default:
            return state;
    }
}