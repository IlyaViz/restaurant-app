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
      <label className="text-gray-900 text-xl">{label}</label>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        required={required}
        className="border rounded-xl text-center duration-400 focus:outline-none focus:ring-1"
      />
    </div>
  );
};

export default Input;
