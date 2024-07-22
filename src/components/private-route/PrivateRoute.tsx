import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthMeQuery } from "../../redux/services/authApi";
import { useEffect } from "react";

interface IPrivateRoute {
  me: string,
  isMe: boolean,
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

const PrivateRoute: React.FC<IPrivateRoute> = ({ me, isMe, isAuth, setIsAuth }) => {
  const { isLoading, isFetching, isError, error } = useAuthMeQuery({ authorization: me }, { skip: !isMe, refetchOnMountOrArgChange: true });
  
  const location = useLocation();

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (isError) {
      if (error?.status === 401) {
        localStorage.removeItem('goods4you');
        setIsAuth(false);
      } else {
        alert(error?.data?.message);
      }
    }
  }, [isError]);

  if (loading) {
     return (
      <main className="section">
        <div className="container">
          <h2 className="title-1">is loading...</h2>
        </div>
      </main>
    );
  }

  return (
    <>
      {isAuth && isMe ? (
        <Outlet />
      ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )}
    </>
  )
};

export default PrivateRoute;