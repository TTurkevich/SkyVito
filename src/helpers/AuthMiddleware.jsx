import { useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { selectAccessToken } from '../features/user/userSlice'
import userApi from '../redux/api/userApi'

const AuthMiddleware = ({ children }) => {
  const token = useSelector(selectAccessToken)

  const { isLoading } = userApi.endpoints.getUser.useQuery('', {
    skip: !token,
  })

  if (isLoading) {
    return <Loader />
  }

  return children
}

export default AuthMiddleware
