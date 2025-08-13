import { useState, useEffect } from "react";
import useStatusesToast from "../hooks/useStatusesToast";
import Input from "./Input";
import Button from "./Button";

const Form = ({ fields, onFormSubmit, submitLabel, submitStatus }) => {
  const [formData, setFormData] = useState({});

  useStatusesToast([submitStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onFormSubmit(formData);
  };

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
          status={submitStatus}
        />
      </div>
    </form>
  );
};

export default Form;
