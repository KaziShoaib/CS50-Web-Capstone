import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import todoListReducer from './reducers/todoListReducer'
import filterReducer from './reducers/filterReducer'
import activeItemReducer from './reducers/activeItemReducer'
import modalReducer from './reducers/modalReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
  todoList: todoListReducer,
  filter: filterReducer,
  activeItem: activeItemReducer,
  modal: modalReducer,
  notification: notificationReducer,
  auth: authReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store