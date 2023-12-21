import Cookes from 'js-cookie'
import jwt_decode from 'jwt-decode'

export const isAuth = () => {
  const token = Cookes.get('jwt')
  if (token) {
    const decodedToken = jwt_decode(token)
    const expirationDate = new Date(decodedToken.exp * 1000)
    const currentDate = new Date()
    // Check if expirationDate is > then currentDate
    if (expirationDate > currentDate) {
      return true
    } else {
      false
    }
  }
}
