import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Children } from "react";
import Navbar from "../component/Navbar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

