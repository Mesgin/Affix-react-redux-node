import { GET_ERRORS } from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken',token)
      setAuthToken(token)

      const decoded = jwt_decode(token)
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}