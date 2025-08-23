import useStatusesToast from "../hooks/useStatusesToast";

const Select = ({ name, required, options, selected, onChange, status }) => {
  useStatusesToast([status]);

  return (
    <select
      name={name}
      required={required}
      value={selected}
      onChange={onChange}
      className="text-center text-2xl w-full"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
