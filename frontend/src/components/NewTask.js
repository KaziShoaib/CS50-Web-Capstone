import React from "react"
import { useDispatch } from "react-redux"

import { setActiveItem } from "../reducers/activeItemReducer"
import { setModal } from "../reducers/modalReducer"

const NewTask = () => {
  const dispatch = useDispatch()
  const blankItem = {title:"", description:"", completed:false}

  return (
    <div className='mb-4'>
      <button 
        className='btn btn-success' 
        onClick = {() => {
          dispatch(setActiveItem(blankItem))
          dispatch(setModal(true))
        }}        
      >
        Add Task
      </button>
    </div>
  )
}

export default NewTask