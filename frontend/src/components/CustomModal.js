import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import { setModal } from "../reducers/modalReducer"
import { setActiveItem } from "../reducers/activeItemReducer"
import { createTodoItem, editTodoItem } from "../reducers/todoListReducer"

const CustomModal = () => {
  const dispatch = useDispatch()
  const activeItem = useSelector(state => state.activeItem)
  const currentModalStatus = useSelector(state => state.modal)

  const toggle = () => {dispatch(setModal(!currentModalStatus))}

  const handleChange = (event) => {
    let {name, value} = event.target
    if(event.target.type === 'checkbox')
      value = event.target.checked
    const newActiveItem = {...activeItem, [name]:value}
    dispatch(setActiveItem(newActiveItem))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toggle() 
    if(!activeItem.id){
      if(window.confirm("do you want to add new item?")){
        dispatch(createTodoItem(activeItem))
      }
    } 
    else {
      if(window.confirm("save changes?")){
        dispatch(editTodoItem(activeItem))
      }
    }  
  } 

  return (
    <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='todo-title'>Title</Label>
              <Input
                type='text'
                id='todo-title'
                name='title'
                value={activeItem.title}
                onChange={handleChange}
                placeholder="Enter todo title"
              />
            </FormGroup>
            <FormGroup>
              <Label for='todo-description'>Description</Label>
              <Input
                type='text'
                id='todo-description'
                name='description'
                value={activeItem.description}
                onChange={handleChange}
                placeholder="Enter todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input 
                  type='checkbox'
                  name='completed'
                  checked={activeItem.completed}
                  onChange={handleChange}
                />
                Compmleted
              </Label>              
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='success'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
    </Modal>
  )
}

export default CustomModal
