/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userApi from '../redux/api/userApi'
import { Loader } from '../components/Loader'
import { selectAccessToken } from '../features/user/userSlice'

const RequireUser = ({ allowedRoles }) => {
  const accessToken = useSelector(selectAccessToken)
  const location = useLocation()

  const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery('', {
    skip: false,
    refetchOnMountOrArgChange: true,
  })

  const loading = isLoading || isFetching

  const user = userApi.endpoints.getUser.useQueryState('', {
    selectFromResult: ({ data }) => data,
  })

  if (loading) {
    return <Loader />
  }

  return accessToken && user && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
}

export default RequireUser
