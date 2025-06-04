"use client"
import Link from "next/link"
import useLoginModal from "@/app/hooks/useLoginModal"

import useMenuLink from "@/app/hooks/useMenuLink"
import MenuLink from "./MenuLink"
import LogoutButton from "../forms/LogoutButton"
import styles from "../Navbar.module.css"
import useUserDetail from "@/app/hooks/useUserDetail"
import { useAuth } from "@/app/hooks/useAuth";





const ReviewNavbar = () => {
    const loginModal = useLoginModal()
    const menuLink = useMenuLink()
    const { userId, userDetail } = useAuth();

    const getColor = (username: any) => {
        const colors = ["#4caf50", "#2196f3", "#f44336", "#ff9800", "#9c27b0"];
        const index = username.charCodeAt(0) % colors.length;
        return colors[index];
      };
   

    const openLoginModal = () =>{
        loginModal.open()
    }
    return (
        <nav className="flex bg-primary px-4 2xl:px-96 xl:px-32 lg:px-12 justify-between">
            <div className="p-6">
            <Link href='/' className="text-white text-2xl font-bold">EthioCompanyReview</Link>
            </div>
          
            <div className="lg:flex hidden items-center text-white">
                <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
                <Link href="/categoriesList" className="text-white  px-4">Categories</Link>
                </div>
                {userDetail ? (
          <div
            onClick={() => {
              menuLink.isOpen ? menuLink.close() : menuLink.open();
            }}
            className="py-6 cursor-pointer flex space-x-2 border-b-2 border-transparent hover:border-white hover:border-b-6 "
          >
            <div
              style={{
                backgroundColor: getColor(userDetail.username),
              }}
              className={styles["user-icon"]}
            >
              {userDetail.username && userDetail.username.charAt(0).toUpperCase()}
            </div>

            {menuLink.isOpen && (
              <div className="w-[228px] flex flex-col cursor-pointer absolute top-[85px] right-50 bg-primary z-50 border rounded-xl shadow-md">
                <MenuLink
                  label="My Profile"
                  onClick={() => {
                    menuLink.close();
                  }}
                />
                <LogoutButton />
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
            <Link onClick={openLoginModal} href="#" className="text-white  px-4">
              Login
            </Link>
          </div>
        )}
                 
                
                <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
                <Link  href="#" className="text-white px-4">Contact</Link>
                </div>

            </div>
            <div className="lg:hidden text-white flex space-x-4">
                <div className="py-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </div>
            <div className="py-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </div>


            </div>
        </nav>
    )
}


export default ReviewNavbar