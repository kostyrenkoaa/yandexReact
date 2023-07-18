import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";

export const ProtectedRouteElement = ({forAuth, children}) => {
  const location = useLocation();
  const userInfo = useSelector(state => state.requests.userInfo);

  if (forAuth && !userInfo) {
    return <Navigate to='/login'/>
  }

  if (!forAuth && userInfo) {
    return <Navigate to={location.state ?? '/'}/>
  }

  return children
};
