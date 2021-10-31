import axios from 'axios'
import { createNotification } from './notificationReducer'

const todoListReducer = (state=[], action) => {
  switch(action.type){
    case 'EDIT_TODO':
      const id = action.data.id      
      return state.map(item => item.id === id ? action.data : item)
    case 'NEW_TODO':
      return [...state, action.data]
    case 'INIT_TODOLIST':
      return action.data
    case 'DELETE_TODO':      
      return state.filter(item => item.id !== action.id)
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
  if(errorObject.detail)
    message += errorObject.detail
  if(errorObject.title)
    message += 'title cannot be blank\n'
  if(errorObject.description)
    message += 'description cannot be blank'
  return message
}


export const initializeTodoList = () => dispatch => {
  const config = configHeader(true)
  axios
    .get('/api/todos/', config)
    .then(response => {
      dispatch({
        type: 'INIT_TODOLIST',
        data: response.data
      })
    })
    .catch(error => {
      //console.log(error.response.data)
      //const message = generateErrorMessage(error.response.data)
      dispatch(createNotification('error', generateErrorMessage(error.response.data)))
    })
} 


export const createTodoItem = (item) => dispatch => {
  const config = configHeader(true)
  axios
    .post('/api/todos/', item, config)
    .then(response => {
      dispatch({
        type: 'NEW_TODO',
        data: response.data
      })
      dispatch(createNotification('success', `${response.data.title} added succesfully`))
    })
    .catch(error => {      
      //const message = generateErrorMessage(error.response.data)
      dispatch(createNotification('error', generateErrorMessage(error.response.data)))
    })
}


export const editTodoItem = (item) => dispatch => {
  const config = configHeader(true)
  axios
    .put(`/api/todos/${item.id}/`, item, config)
    .then(response => {
      dispatch({
        type:'EDIT_TODO',
        data: response.data
      })
      dispatch(createNotification('success', 'Edit Successful'))
    })
    .catch(error => {
      //const message = generateErrorMessage(error.response.data)
      dispatch(createNotification('error', generateErrorMessage(error.response.data)))
    })
}


export const deleteTodoItem = (id) => dispatch => {
  const config = configHeader(true)
  axios
    .delete(`/api/todos/${id}/`, config)
    .then(response => {
      dispatch({
        type: 'DELETE_TODO',
        id
      })
    })
    .catch(error => {
      console.log(error)
    })
}

export default todoListReducer 