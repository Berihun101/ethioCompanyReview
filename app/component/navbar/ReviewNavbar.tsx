
import Link from "next/link";


import NavbarMini from "./NavbarMini";
import LoginButton from "../forms/LoginButton";
import apiService from "@/app/services/apiServices";
import { getUserId } from "@/app/lib/actions";

import {
  Sheet,
 
  SheetContent,

  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoveRight } from "lucide-react";
import UserProfile from "./UserProfile";
import { userDetailType } from "../writeReviews/WriteReviews";





const ReviewNavbar = async () => {
  
  // Fetch user details if not provided
 
    const userId = await getUserId();
    let userDetail: userDetailType | null = null;
    if (userId) {
      userDetail = await apiService.get(`auth/${userId}`);
    }

  return (
    <nav className="flex bg-primary px-4 2xl:px-96 xl:px-32 lg:px-12 justify-between">
      <div className="p-6">
        <Link href="/" className="text-white text-2xl font-bold">
          EthioCompanyReview
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="lg:flex hidden items-center text-white">
        <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
          <Link href="/categoriesList" className="text-white  px-4">
            Categories
          </Link>
        </div>
        {userDetail ? (
          <NavbarMini userDetail={userDetail} />
        ) : (
          <LoginButton />
        )}
        <div className="py-6 border-b-2 border-transparent hover:border-white hover:border-b-6 ">
        <Link target="_blank" className="text-text-myColor px-4" href="https://portfolio-nine-sage-94.vercel.app/">Contact</Link>

        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden text-white flex space-x-4">
        <div className="py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
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
                className="size-6 cursor-pointer"
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
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/writeReview" className="text-white hover:text-primary-200">
                Write Review
              </Link>
              <Link href="/categoriesList" className="text-white hover:text-primary-200">
                Categories
              </Link>
              {userDetail ? (
               <UserProfile />
              ) : (
                <LoginButton /> 
              )}
              <Link href="#" className="text-white hover:text-primary-200">
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default ReviewNavbar;