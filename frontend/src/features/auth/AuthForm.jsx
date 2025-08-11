import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "./authSlice";
import Form from "../../components/Form";

const AuthForm = ({ fields, onFormSubmit, submitLabel, submitStatus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <Form
      fields={fields}
      onFormSubmit={onFormSubmit}
      submitLabel={submitLabel}
      submitStatus={submitStatus}
    />
  );
};

export default AuthForm;
