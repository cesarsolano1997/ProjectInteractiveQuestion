import { showAlert } from '../redux/actions/alertAction'
import { useDispatch } from 'react-redux'

import axios from 'axios'
import { useEffect } from 'react'

const Main = ({ children }) => {
  const dispatch = useDispatch()
  // dispatch(showAlert(true))

  useEffect(() => {
    axios.interceptors.response.use(
      function (response) {
        if (response.data.valid) {
          dispatch(showAlert(response.data.valid, response.data.message))
        }

        return response.data
      },
      function (error) {
        return Promise.reject(error.response.data)
      }
    )
  }, [])

  return <main>{children}</main>
}

export default Main
