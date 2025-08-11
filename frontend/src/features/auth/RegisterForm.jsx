import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "./authThunk";
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

  const onFormSubmit = async (formData) => {
    try {
      await dispatch(registerThunk(formData)).unwrap();

      navigate("/login");
    } catch (error) {
      console.error("Registration failed (no navigate applied)");
    }
  };

  return (
    <AuthForm
      fields={fields}
      onFormSubmit={onFormSubmit}
      submitLabel="Register"
      submitStatus={registerStatus}
    />
  );
};

export default RegisterForm;
