const modalReducer = (state=false, action) => {
  switch(action.type){
    case 'SET_MODAL':
      return action.data
    default:
      return state
  }
}

export const setModal = status => dispatch => {
  dispatch({
      type: 'SET_MODAL',
      data: status    
  }) 
}

export default modalReducer