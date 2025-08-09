const Button = ({ active = true, type, label, onClick, className }) => {
  return (
    <div className="flex flex-col">
      <button
        disabled={!active}
        type={type}
        onClick={onClick}
        className={`${className} ${!active && "opacity-50"} cursor-pointer`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
