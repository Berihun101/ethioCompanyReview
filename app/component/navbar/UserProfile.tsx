"use client"
import useMenuLink from "@/app/hooks/useMenuLink";
import MenuLink from "./MenuLink";
import LogoutButton from "../forms/LogoutButton";
import { useRouter } from "next/router";

const UserProfile = () => {
    const menuLink = useMenuLink();
    const router = useRouter();
    
    return (
        <>
        <MenuLink
          label="My Profile"
          onClick={() => {
            router.push("/myProfile");
            menuLink.close();
          }}
        />
        <LogoutButton />
      </>
    );
    }

export default UserProfile;