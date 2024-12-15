import { Navigate, Outlet } from 'react-router-dom'
import { useAdminStatus } from '../hooks/useAdmin'
import Loader from './Loader'

const AdminRoute = () => {
  const { isAdminCheck, checkingStatus } = useAdminStatus()

  if (checkingStatus) {
    return <Loader />
  }

  return isAdminCheck ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute