import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "./authSlice.js";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";

const AuthForm = ({ fields, onSubmit, submitLabel, loading, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleAuthError = (error) => {
    if ("non_field_errors" in error) {
      return <div>{error.non_field_errors}</div>;
    }

    if (fields.some((field) => field.name in error)) {
      return (
        <div>
          {fields.map((field) => {
            if (field.name in error) {
              return <div key={field.name}>{error[field.name]}</div>;
            }
          })}
        </div>
      );
    }

    return <div>{error}</div>;
  };

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

        <Button type="submit" label={submitLabel} className="btn-primary" />
      </div>

      {loading && <div>Processing....</div>}

      {error && (
        <div className="text-red-500 mt-2">
          {handleAuthError(error, fields)}
        </div>
      )}
    </form>
  );
};

export default AuthForm;
