import {UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,UPDATE_PROFILE_SUCCESS,CLEAR_ERRORS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_RESET,FORGOT_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS} from "../constants/userConstants";

export const profileUpdateReducer = (state = {user:{}},action) =>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true
            }
         case UPDATE_PROFILE_SUCCESS:
         case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
            case UPDATE_PROFILE_FAIL:
            case UPDATE_PASSWORD_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload
                }
            case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:
                return{
                    ...state,
                     isUpdated: false
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

//FORGOT PASSWORD REDUCER
export const forgotPasswordReducer = (state = {user:{}},action) =>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
         case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.payload
            }
         case RESET_PASSWORD_SUCCESS:
              return{
                 ...state,
                 loading:false,
                 success:action.payload
              }
            case FORGOT_PASSWORD_FAIL:
             case RESET_PASSWORD_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload
                }
            case FORGOT_PASSWORD_RESET:
                return{
                    ...state,
                     isUpdated: false
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

