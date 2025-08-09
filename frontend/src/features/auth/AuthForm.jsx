import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "./authSlice";
import { showToast } from "../toast/toastSlice";
import Input from "../../components/Input";
import Button from "../../components/Button";

const AuthForm = ({ fields, onSubmit, submitLabel, loading, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(showToast({ message: error, type: "error" }));
    }
  }, [error, dispatch]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <Input
            key={index}
            name={field.name}
            type={field.type}
            label={field.label}
            required={field.required}
          />
        ))}

        <Button
          type="submit"
          label={submitLabel}
          className="btn-primary"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default AuthForm;
