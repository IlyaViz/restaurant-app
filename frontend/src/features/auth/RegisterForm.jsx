import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "./authThunk";
import Form from "../../components/Form";

const RegisterForm = () => {
  const registerStatus = useSelector((state) => state.auth.registerStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  const onFormSubmit = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();

      navigate("/login");
    } catch (error) {
      console.error("Registration failed (no navigate applied)");
    }
  };

  return (
    <Form
      fields={fields}
      onFormSubmit={onFormSubmit}
      submitLabel="Register"
      submitStatus={registerStatus}
    />
  );
};

export default RegisterForm;
