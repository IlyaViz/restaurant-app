import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

const Form = ({
  fields,
  selectors,
  onFormSubmit,
  submitLabel,
  submitStatus,
}) => {
  const getFormData = () => {
    const formData = {};

    fields.reduce((acc, field) => {
      if (field.type === "file") {
        acc[field.name] = { value: "", file: null };
      } else {
        acc[field.name] = field.value || "";
      }

      return acc;
    }, formData);

    selectors.reduce((acc, selector) => {
      acc[selector.name] = selector.selected || "";

      return acc;
    }, formData);

    return formData;
  };

  const [formData, setFormData] = useState(getFormData());

  const getFormDataValue = (field) => {
    if (field.type === "file") {
      return formData[field.name].value;
    }

    return formData[field.name];
  };

  const onFieldChange = (e, field) => {
    if (field.type === "file") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        [field.name]: { value: e.target.value, file },
      });
    } else {
      setFormData({
        ...formData,
        [field.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    fields.forEach((field) => {
      if (field.type === "file") {
        if (formData[field.name].file) {
          data.append(field.name, formData[field.name].file);
        }
      } else {
        data.append(field.name, formData[field.name]);
      }
    });

    selectors.forEach((selector) => {
      data.append(selector.name, formData[selector.name]);
    });

    onFormSubmit(data);
  };

  useEffect(() => {
    setFormData(getFormData());
  }, [fields]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-2">
        {fields &&
          fields.map((field, index) => (
            <Input
              key={index}
              name={field.name}
              value={getFormDataValue(field)}
              type={field.type}
              label={field.label}
              required={field.required}
              onChange={(e) => onFieldChange(e, field)}
            />
          ))}

        {selectors &&
          selectors.map((selector, index) => (
            <Select
              key={index}
              name={selector.name}
              options={selector.options}
              selected={selector.selected}
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
