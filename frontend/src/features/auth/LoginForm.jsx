import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginThunk } from "./authThunk";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await dispatch(loginThunk(data)).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Login failed (no navigate applied)");
    }
  };

  return (
    <AuthForm
      fields={fields}
      onSubmit={onFormSubmit}
      submitLabel="Login"
      loading={loginStatus.loading}
      error={loginStatus.error}
    />
  );
};

export default LoginForm;
