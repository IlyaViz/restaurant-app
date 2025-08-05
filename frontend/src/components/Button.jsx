const Button = ({ type, label, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={`${className}`}>
      {label}
    </button>
  );
};

export default Button;
