import { SHOW_ALERT } from '../types/index'

export function showAlert(alert, message) {
  const alertAll = { alert, message }
  return (dispatch) => {
    dispatch(createAlert(alertAll))
  }
}

const createAlert = (alert) => ({
  type: SHOW_ALERT,
  payload: alert,
})
