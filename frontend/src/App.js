import React, { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { 
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'


import Header from "./components/Header"
import NewTask from "./components/NewTask"
import TabList from "./components/TabList"
import TodoList from "./components/TodoList"
import CustomModal from "./components/CustomModal"
import Alert from "./components/Alert"
import Login from "./components/Login"
import Register from "./components/Register"

import { loadUser } from "./reducers/authReducer"

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  const modal = useSelector(state => state.modal)
  const userData = useSelector(state => state.auth)

  return(
    <div>
      <Router>
        <main className='container'>      
          <h1 className='text-white text-uppercase text-center my-4'>Todo App</h1>
          <div className='row'>
            <div className='col-md-6 col-sm-10 mx-auto p-0'>
              <div className='card p-3'>
                <Header/>
                <Alert/>
                <Route exact path="/">
                  { userData.isAuthenticated ?
                      <Fragment>                    
                        <NewTask/>
                        <TabList/>
                        <TodoList/>
                      </Fragment> :
                      <Login />
                  }
                  
                </Route>
                <Route exact path='/login'>
                  <Login/>
                </Route>
                <Route exact path='/register'>
                  <Register/>
                </Route>
              </div>
            </div>
          </div>
          {modal ? <CustomModal/> : null}
        </main>
      </Router>
    </div>
  )
}


export default App