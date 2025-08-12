import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import Input from "./Input";
import Button from "./Button";

const Form = ({ fields, onFormSubmit, submitLabel, submitStatus }) => {
  const [formData, setFormData] = useState({});
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    onFormSubmit(formData);
  };

  useEffect(() => {
    if (submitStatus.error) {
      dispatch(showToast({ message: submitStatus.error, type: "error" }));
    }
  }, [submitStatus.error, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
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
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        ))}

        <Button
          type="submit"
          label={submitLabel}
          className="btn-primary"
          loading={submitStatus.loading}
        />
      </div>
    </form>
  );
};

export default Form;
