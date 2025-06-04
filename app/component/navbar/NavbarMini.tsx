"use client"

import { useState, useEffect } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useMenuLink from "@/app/hooks/useMenuLink";
import MenuLink from "./MenuLink";
import styles from "../Navbar.module.css";
import LogoutButton from "../forms/LogoutButton";
import { userDetailType } from "../writeReviews/WriteReviews";
import { useRouter } from "next/navigation";

interface navbarMiniProps {
  userDetail: userDetailType;
}
const NavbarMini:React.FC<navbarMiniProps> = ({userDetail}) => {
    const loginModal = useLoginModal();
    const menuLink = useMenuLink();
    const router = useRouter();

    const getColor = (username: any) => {
        const colors = ["#4caf50", "#2196f3", "#f44336", "#ff9800", "#9c27b0"];
        const index = username.charCodeAt(0) % colors.length;
        return colors[index];
      };
    
    return (
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
                    router.push("/myProfile");
                    menuLink.close();
                  }}
                />
                <LogoutButton />
              </div>
            )}
          </div>
    );
    }

export default NavbarMini;