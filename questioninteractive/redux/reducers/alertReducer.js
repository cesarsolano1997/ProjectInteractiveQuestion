import { SHOW_ALERT } from '../types/index'

const initialState = {
  alert: false,
  message: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload.alert,
        message: action.payload.message,
      }
    default:
      return state
  }
}
