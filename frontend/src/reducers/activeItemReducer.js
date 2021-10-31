const blankItem = {title:"", description:"", completed:false}

const activeItemReducer = (state= blankItem, action) => {
  switch(action.type){
    case 'SET_ACTIVEITEM':
      return action.data
    default:
      return state
  }
}

export const setActiveItem = (item) => dispatch => {
  dispatch({
    type: 'SET_ACTIVEITEM',
    data: item
  }) 
}

export default activeItemReducer