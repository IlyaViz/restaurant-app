const Button = ({
  active = true,
  type,
  label,
  onClick,
  className,
  loading,
}) => {
  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <button
          disabled={!active}
          type={type}
          onClick={onClick}
          className={`${className} ${!active && "opacity-50"} cursor-pointer`}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Button;
