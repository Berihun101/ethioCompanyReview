'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface MenuLinkProps {
label:string,
onClick?: () => void,
}

const MenuLink: React.FC<MenuLinkProps> = ({label, onClick}) =>{
    return (
        <div 
        onClick={onClick}
        className="px-5 py-3 cursor-pointer hover:bg-primary-600 rounded-xl transition ">
        {label}
        </div>
    )
}
export default MenuLink