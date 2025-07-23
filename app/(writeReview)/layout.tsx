import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Children } from "react";
import ReviewNavbar from "../component/navbar/ReviewNavbar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ReviewNavbar />
            {children}
        </div>
    )
}

