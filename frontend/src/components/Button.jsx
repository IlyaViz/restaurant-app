const Button = ({ active = true, type, label, onClick, className }) => {
  return (
    <button
      disabled={!active}
      type={type}
      onClick={onClick}
      className={`${className} ${!active && "opacity-50"} cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default Button;
