
import Link from "next/link";



import {
  Sheet,
 
  SheetContent,

  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoveRight } from "lucide-react";
import LogoutButton from "../forms/LogoutButton";






const ProfileNavbar= () => {
  
  
  return (
    <nav className="flex bg-primary px-4 2xl:px-96 xl:px-32 lg:px-12 justify-between">
      <div className="p-6">
        <Link href="/" className="text-white text-2xl font-bold">
          EthioCompanyReview
        </Link>
      </div>

        {/* Sheet for Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary text-white">
            <SheetHeader>
              <SheetTitle className="text-white">EthioCompanyReview</SheetTitle>
              
            </SheetHeader>
           <LogoutButton />
          </SheetContent>
        </Sheet>
     
    </nav>
  );
};

export default ProfileNavbar;