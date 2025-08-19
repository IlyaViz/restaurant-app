import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginThunk } from "./authThunk";
import FIELD_TYPE from "../../enums/fieldType";
import Form from "../../components/Form";

const LoginForm = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = [
    {
      type: FIELD_TYPE.INPUT,
      name: "username",
      label: "Username",
      inputType: "text",
      required: true,
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "password",
      label: "Password",
      inputType: "password",
      required: true,
    },
  ];

  const onFormSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();

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
