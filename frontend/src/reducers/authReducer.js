import axios from "axios"

import { createNotification } from "./notificationReducer"

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.data.user,
        token: action.data.token
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.data.token)
      return {
        ...state,        
        token: action.data.token,
        user: action.data.user,
        isAuthenticated: true
      }
    case 'AUTH_ERROR':
    case 'LOGIN_ERROR':
    case 'LOGOUT_SUCCESS':
    case 'RESISTER_FAILURE':
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null 
      }
    default: 
      return state 
  }
}


const configHeader = (withToken = false) => {  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if(withToken){
    const token = localStorage.getItem('token')
    if(token){
      config.headers['Authorization'] = `Token ${token}`    
    }
  }
  return config 
}


const generateErrorMessage = (errorObject) => {
  let message = ''
  if(errorObject.non_field_errors)
    message += 'Incorrect Credentials//'
  if(errorObject.username)
    message += `username : ${errorObject.username.join()}//`
  if(errorObject.password)
    message += 'password cannot be blank//'
  if(errorObject.email)
    message += 'please put a valid email address//'
  return message
}


export const loadUser = () => dispatch => {
  const config = configHeader(true) 
  axios
    .get('/api/auth/user', config)
    .then(response => { 
      dispatch({
        type: 'USER_LOADED',
        data: {
          user: response.data,
          token: localStorage.getItem('token')
        }
      })
    })
    .catch(error => {      
      dispatch({
        type: 'AUTH_ERROR'
      })
    })
}


export const login = (username, password) => dispatch => {
  const body = JSON.stringify({username, password})
  const config = configHeader()
  axios
    .post('/api/auth/login', body, config)
    .then(response => { 
      dispatch({
        type: 'LOGIN_SUCCESS',
        data: response.data
      })
    })
    .catch(error => {        
      dispatch({
        type: 'LOGIN_ERROR'
      })
      // const message = generateErrorMessage(error.response.data)
      // console.log(message)
      dispatch(createNotification('error', generateErrorMessage(error.response.data)))      
    })
}


export const logout = () => dispatch => {
  const config = configHeader(true)
  axios
    .post('api/auth/logout', null, config) // null as body is required by knox in logout
    .then(response => {                
      dispatch({
        type: 'LOGOUT_SUCCESS'
      })
    })
    .catch(error => {
      console.log(error.response.data)  
    })  
}


export const register = ({username, password, email}) => dispatch => {
  const body = JSON.stringify({username, password, email})
  const config = configHeader()
  axios
    .post('/api/auth/register', body, config)
    .then(response => { 
      dispatch({
        type: 'REGISTER_SUCCESS',
        data: response.data
      })
    })
    .catch(error => {      
      dispatch({
        type: 'RESISTER_FAILURE'
      })
      // const message = generateErrorMessage(error.response.data)
      // console.log(message)
      dispatch(createNotification('error', generateErrorMessage(error.response.data)))  
    })

}


export default authReducer