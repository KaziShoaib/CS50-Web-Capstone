import React from 'react'
import  ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'

import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import store from './store'
import App from './App'

const alertOptions = {
  timeout: 4000,
  position: 'top center'
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>, 
  document.getElementById('root')
)