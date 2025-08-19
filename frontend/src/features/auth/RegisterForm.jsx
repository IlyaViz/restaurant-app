import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "./authThunk";
import FIELD_TYPE from "../../enums/fieldType";
import Form from "../../components/Form";

const RegisterForm = () => {
  const registerStatus = useSelector((state) => state.auth.registerStatus);

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
      name: "email",
      label: "Email",
      inputType: "email",
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
