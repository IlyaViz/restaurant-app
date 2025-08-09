const Button = ({
  active = true,
  type,
  label,
  onClick,
  className,
  loading,
}) => {
  const isButtonDisabled = loading || !active;
  const opacity = isButtonDisabled ? "opacity-50" : "opacity-100";
  const cursor = isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div className="flex flex-col">
      <button
        disabled={isButtonDisabled}
        type={type}
        onClick={onClick}
        className={`${className} ${opacity} ${cursor}`}
      >
        {loading ? "Loading..." : label}
      </button>
    </div>
  );
};

export default Button;
