import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,LOADER_FAIL,LOADER_REQUEST,LOADER_SUCCESS,LOGOUT_FAIL,LOGOUT_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,UPDATE_PROFILE_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_RESET,RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS} from "../constants/userConstants";
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
//for user when he logs in
export const loader = () => async(dispatch) => {
   try{
    dispatch({type: LOADER_REQUEST});
    const {data} = await axios.get(`/api/v1/me`);

    dispatch({type: LOADER_SUCCESS, payload: data.user})
   }
   catch(error){
    dispatch({type: LOADER_FAIL, payload: error.response.data.message});
   }
};
//for logging out the user
export const logout = () => async(dispatch) => {
   try{
    await axios.get(`/api/v1/logout`);

    dispatch({type: LOGOUT_SUCCESS})
   }
   catch(error){
    dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
   }
};

//for updating the profile
export const updateProfile = (userData) =>async(dispatch)=>{
   try{
    dispatch({type: UPDATE_PROFILE_REQUEST})
    const config = {headers: {"Content-Type" : "multipart/form-data"}};
    const {data} = await axios.put(`/api/v1/me/update`,
    userData,
    config);

    dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success})
   }
   catch(error){
    dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
   }
};

//for updating the password
export const updatePassword = (password) =>async(dispatch)=>{
   try{
    dispatch({type: UPDATE_PASSWORD_REQUEST})
    const config = {headers: {"Content-Type" : "application/json"}};
    const {data} = await axios.put(`/api/v1/password/update`,
    password,
    config);

    dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success})
   }
   catch(error){
    dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
   }
};

//FORGOT PASSWORD WHEN USER HAS FORGOTTEN THE PASSWORD

export const forgotPassword = (email) =>async(dispatch)=>{
   try{
    dispatch({type: FORGOT_PASSWORD_REQUEST})
    const config = {headers: {"Content-Type" : "application/json"}};
    const {data} = await axios.post(`/api/v1/password/forgot`,
    email,
    config);

    dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message})
   }
   catch(error){
    dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message}); 
   }
};

//RESET PASSWORD WHEN USER ACTUALLY FORGETS IT

export const resetPassword = (token,password)=>async(dispatch)=>{
      try{
         dispatch({type: RESET_PASSWORD_REQUEST})
         const config = {headers: {"Content-Type" : "application/json"}};
         const {data} = await axios.put(`/api/v1/password/reset/${token}`,
         password,
         config);
     
         dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success})
        }
        catch(error){
         dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message}); 
        }
};