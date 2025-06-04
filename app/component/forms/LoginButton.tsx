"use client"
import Link from "next/link";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginButton = () => {
    const loginModal = useLoginModal();

    const openLoginModal = () => {
        loginModal.open();
      };
   
    
    return (
        <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
        <Link onClick={openLoginModal} href="#" className="text-white  px-4">
          Login
        </Link>
      </div>
    );
    }

export default LoginButton;