import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authSlice";
import AuthForm from "./AuthForm";

const RegisterForm = () => {
  const registerStatus = useSelector((state) => state.auth.registerStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await dispatch(register(data)).unwrap();

      navigate("/login");
    } catch (error) {
      console.error("Registration failed (no navigate applied)");
    }
  };

  return (
    <AuthForm
      fields={fields}
      onSubmit={onFormSubmit}
      submitLabel="Register"
      loading={registerStatus.loading}
      error={registerStatus.error}
    />
  );
};

export default RegisterForm;
