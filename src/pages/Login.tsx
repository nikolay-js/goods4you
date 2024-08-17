import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/ui-kit/button/Button";
import Input from "../components/ui-kit/input/Input";
import { useAuthLoginMutation } from "../redux/services/authApi";

interface ILogin {
  setIsAuth: (isAuth: boolean) => void;
};

const Login: React.FC<ILogin> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [authLogin, { isSuccess, isLoading, data, isError, error }] = useAuthLoginMutation();

  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('goods4you', JSON.stringify(data.token));
      setIsAuth(true);
      navigate(from, { replace: true });
    };
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error?.data?.message !== 'Invalid credentials') alert('error' in error ? error.error : error.data.message);
  }, [isError]);

  const handleSubmit = () => {
    event.preventDefault();
    let { username: { value: username }, password: { value: password } } = document.forms[0];
    authLogin({ username, password });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="login">
          <h2 className="title-1">Sign in</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <Input disabled={isLoading} type="text" placeholder="Login" name="username" required />
            <Input disabled={isLoading} type="password" placeholder="Password" name="password" required />
            {error?.data?.message === 'Invalid credentials' && <div className="login__form-error">{error.data.message}</div>}
            <Button disabled={isLoading} type="submit" className="login__form-btn">Sign in</Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
