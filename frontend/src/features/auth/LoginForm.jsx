import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice.js";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const loginError = useSelector((state) => state.auth.login.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await dispatch(login(data)).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Login failed (no navigate applied):", error);
    }
  };

  return (
    <AuthForm
      fields={fields}
      onSubmit={onFormSubmit}
      submitLabel="Login"
      error={loginError}
    />
  );
};

export default LoginForm;
