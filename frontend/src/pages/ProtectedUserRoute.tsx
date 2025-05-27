import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user-slice';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute: React.FC = () => {
  const user = useAppSelector(selectUser);
  return user && user.id ? <Outlet /> : <Navigate to="/auth?mode=login" replace />;
}

export default ProtectedUserRoute;