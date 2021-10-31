const filterReducer = (state = true, action) => {
  switch(action.type){
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const switchFilter = flag => dispatch => {
  dispatch({
    type: 'SET_FILTER',
    data: flag
  })
}

export default filterReducer