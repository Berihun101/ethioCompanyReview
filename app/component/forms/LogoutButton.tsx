"use client";
import MenuLink from "../navbar/MenuLink";
import { resetAuthCookies } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import useUserDetail from "@/app/hooks/useUserDetail";

const LogoutButton = () => {
    const { logout } = useUserDetail(); // Get Zustand logout function
    const router = useRouter();

    const submitLogout = async () => {
        try {
            await resetAuthCookies(); // Remove authentication cookies (server-side)
            logout(); // Clear user data from Zustand state
            router.refresh(); // Refresh session to reflect logout
            router.push("/"); // Redirect to home page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <MenuLink
            label="Logout"
            onClick={submitLogout}
        />
    );
};

export default LogoutButton;
