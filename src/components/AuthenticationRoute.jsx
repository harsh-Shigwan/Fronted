import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AuthenticationRoute = () => {
  const isAuthorized = !!localStorage.getItem('Token');
  const location = useLocation();
 
  if (!isAuthorized) {
    
    return (
      <Navigate
        to="/Login"
        replace
        state={{ redirectTo: location }}
      />
    );
  }

  return (
    <div>
   
     <Sidebar>
      <Outlet />
      </Sidebar>
    </div>
  );
};

export default AuthenticationRoute;
