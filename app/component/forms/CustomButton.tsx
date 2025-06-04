interface CustomButtonProps {
    label:string,
    onClick: () => void,
    className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({label, onClick, className}) => {
    return <div 
    onClick={onClick}
    className={`w-full py-4 bg-primary hover:bg-primary-500 rounded-xl text-white transition cursor-pointer ${className}`}>

        {label}
    </div>;
}

export default CustomButton;