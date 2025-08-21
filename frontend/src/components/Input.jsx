import useStatusesToast from "../hooks/useStatusesToast";

const Input = ({
  name,
  type,
  value,
  placeholder,
  label,
  required,
  onChange,
  status,
}) => {
  useStatusesToast([status]);

  return (
    <div className="flex flex-col items-center">
      <label>{label}</label>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        required={required}
        className="border"
      />
    </div>
  );
};

export default Input;
