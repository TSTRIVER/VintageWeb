import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,LOADER_FAIL,LOADER_REQUEST,LOADER_SUCCESS} from "../constants/userConstants";
import axios from "axios";

export const login = (email,password) =>async(dispatch)=>{
   try{
    dispatch({type: LOGIN_REQUEST})
    const config = {headers: {"Content-Type" : "application/json"}};
    const {data} = await axios.post(`/api/v1/login`,
    {email,password},
    config);

    dispatch({type: LOGIN_SUCCESS, payload: data.user})
   }
   catch(error){
    dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
   }
};

export const clearErrors = () => async(dispatch)=>{
    dispatch({
       type: CLEAR_ERRORS
        })
};

export const register = (userData) =>async(dispatch)=>{
   try{
    dispatch({type: USER_REGISTER_REQUEST})
    const config = {headers: {"Content-Type" : "multipart/form-data"}};
    const {data} = await axios.post(`/api/v1/register`,
    userData,
    config);

    dispatch({type: USER_REGISTER_SUCCESS, payload: data.user})
   }
   catch(error){
    dispatch({type: USER_REGISTER_FAIL, payload: error.response.data.message});
   }
};

export const loader = () =>async(dispatch)=>{
   try{
    dispatch({type: LOADER_REQUEST})
    const config = {headers: {"Content-Type" : "application/json"}};
    const {data} = await axios.post(`/api/v1/me`);

    dispatch({type: LOADER_SUCCESS, payload: data.user})
   }
   catch(error){
    dispatch({type: LOADER_FAIL, payload: error.response.data.message});
   }
};