const Input = ({ name, type, label, required, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <label>{label}</label>
      <input
        name={name}
        onChange={onChange}
        type={type}
        required={required}
        className="border"
      />
    </div>
  );
};

export default Input;
