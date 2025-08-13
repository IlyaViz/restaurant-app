import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginThunk } from "./authThunk";
import Form from "../../components/Form";

const LoginForm = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (formData) => {
    try {
      await dispatch(loginThunk(formData)).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Login failed (no navigate applied)");
    }
  };

  return (
    <Form
      fields={fields}
      onFormSubmit={onFormSubmit}
      submitLabel="Login"
      submitStatus={loginStatus}
    />
  );
};

export default LoginForm;
