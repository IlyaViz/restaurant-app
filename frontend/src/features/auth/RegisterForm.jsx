import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authSlice.js";
import AuthForm from "./AuthForm";

const RegisterForm = () => {
  const registerError = useSelector((state) => state.auth.register.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await dispatch(register(data)).unwrap();

      navigate("/login");
    } catch (error) {
      console.error("Registration failed (no navigate applied):", error);
    }
  };

  return (
    <AuthForm
      fields={fields}
      onSubmit={onFormSubmit}
      submitLabel="Register"
      error={registerError}
    />
  );
};

export default RegisterForm;
