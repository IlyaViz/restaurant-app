import useStatusesToast from "../hooks/useStatusesToast";

const Select = ({ options, selected, onChange, status }) => {
  useStatusesToast([status]);

  return (
    <select
      value={selected}
      onChange={onChange}
      className="text-center text-2xl"
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
