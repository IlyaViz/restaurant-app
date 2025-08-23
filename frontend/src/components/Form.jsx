import { useState, useEffect } from "react";
import FIELD_TYPE from "../enums/fieldType";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

const Form = ({ label, fields, onFormSubmit, submitLabel, submitStatus }) => {
  const getFormData = () => {
    const data = {};

    fields.reduce((acc, field) => {
      switch (field.type) {
        case FIELD_TYPE.INPUT:
          if (field.inputType === "file") {
            acc[field.name] = { value: "", file: null };
          } else {
            acc[field.name] = field.value || "";
          }

          break;
        case FIELD_TYPE.SELECT:
          acc[field.name] = field.selected || "";

          break;
      }

      return acc;
    }, data);

    return data;
  };

  const [formData, setFormData] = useState(getFormData());

  const getValue = (field) => {
    switch (field.type) {
      case FIELD_TYPE.INPUT:
        if (field.inputType === "file") {
          return formData[field.name].value;
        }

        return formData[field.name];
      case FIELD_TYPE.SELECT:
        return formData[field.name];
    }
  };

  const onFieldChange = (e, field) => {
    switch (field.type) {
      case FIELD_TYPE.INPUT:
        if (field.inputType === "file") {
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

        break;

      case FIELD_TYPE.SELECT:
        setFormData({
          ...formData,
          [field.name]: e.target.value,
        });

        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      fields.some(
        (field) => field.type === FIELD_TYPE.INPUT && field.inputType === "file"
      )
    ) {
      const data = new FormData();

      fields.forEach((field) => {
        switch (field.type) {
          case FIELD_TYPE.INPUT:
            if (field.inputType === "file") {
              if (formData[field.name].file) {
                data.append(field.name, formData[field.name].file);
              }
            } else {
              data.append(field.name, formData[field.name]);
            }

            break;
          case FIELD_TYPE.SELECT:
            data.append(field.name, formData[field.name]);

            break;
        }
      });

      onFormSubmit(data);
    } else {
      onFormSubmit(formData);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case FIELD_TYPE.INPUT:
        return (
          <Input
            key={field.name}
            {...field}
            type={field.inputType}
            value={getValue(field)}
            onChange={(e) => onFieldChange(e, field)}
          />
        );
      case FIELD_TYPE.SELECT:
        return (
          <Select
            key={field.name}
            {...field}
            selected={getValue(field)}
            onChange={(e) => onFieldChange(e, field)}
          />
        );
    }
  };

  useEffect(() => {
    setFormData(getFormData());
  }, [fields]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center bg-blue-200 p-8 rounded-4xl text-sm xl:text-2xl"
    >
      <h1 className="text-4xl font-bold">{label}</h1>

      <hr className="w-full mt-2" />

      <div className="flex flex-col gap-4 mt-8">
        {fields.map((field) => renderField(field))}

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
