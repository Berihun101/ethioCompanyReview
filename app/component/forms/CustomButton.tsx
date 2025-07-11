interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className = "",
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 bg-primary hover:bg-primary-500 rounded-xl text-white transition ${
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;