"use client";
import { useState, useEffect, useRef, use } from "react";
import ProfileNavbar from "../component/navbar/ProfileNavbar";
import Image from "next/image";
import RecentUserActivity from "../component/RecentUserActivity";
import apiService from "../services/apiServices";
import { getUserId } from "../lib/actions";
import { userDetailType } from "../component/writeReviews/WriteReviews";
import { reviewCommentType } from "../component/review/Review";

const MyProfile = () => {
  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState("username");
  const [userDetails, setUserDetails] = useState<userDetailType>();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userReviewCount, setUserReviewCount] = useState<number>(0);
  const [userComments, setUserComments] = useState<reviewCommentType[]>([]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTempImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserComments = async () => {
      if (userId) {
        try {
          const comments = await apiService.get(`review/user_comments/${userId}/`);
          setUserComments(comments);
        } catch (error) {
          console.error("Error fetching user comments:", error);
        }
      }
    };
    fetchUserComments();
  }
  , [userId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await apiService.get(`auth/${userId}/`);
            setUserDetails(response);
        
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchUserReviewCount = async () => {
      if (userId) {
        try {
          const user_review_count = await apiService.get(`review/user_review_count/${userId}/`);
          setUserReviewCount(user_review_count);
        } catch (error) {
          console.error("Error fetching user review count:", error);
        }
      }
    };
    fetchUserReviewCount();
  }, [userId]);

  // Save image changes only
  const handleSaveImage = async () => {
    if (tempImage && userId) {
      try {
        const formData = new FormData();
        
        // Convert data URL to Blob if needed
        const blob = await fetch(tempImage).then(r => r.blob());
        formData.append('image', blob, 'avatar.jpg');
        
        const response = await apiService.put(`auth/updateAvatar/${userId}/`, formData);
        
        
        setTempImage(null);
        console.log('Upload successful', response);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  // Save username changes only
  const handleSaveUsername = async () => {
    // Add your username update API call here
    console.log('Username saved:', username);
    setEditUsername(false);
  };

  // Trigger file input click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <ProfileNavbar />
      <div className="flex justify-between md:px-64 px-6 py-4">
        <p className="text-2xl text-gray-500">Profile</p>
        <button
          onClick={tempImage ? handleSaveImage : editUsername ? handleSaveUsername : () => setEditUsername(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {tempImage ? "Save Image" : editUsername ? "Save Username" : "Edit Profile"}
        </button>
      </div>

      <div className="flex flex-col gap-4 mx-auto">
        {/* Profile Image Container */}
        <div className="rounded-full relative overflow-hidden w-60 h-60 mx-auto">
          <Image
            fill
            className="rounded-full object-cover"
            src={tempImage || `http://localhost:8000/${userDetails?.avatar}`}
            alt="Profile"
    
          />
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          {/* Camera Icon */}
          <div 
            onClick={handleCameraClick}
            className="absolute bottom-5 cursor-pointer hover:bg-primary-200 right-12 z-10 rounded-full p-2 bg-primary"
          >
            <svg 
              className="w-6 h-6 text-white" 
              xmlns="http://www.w3.org/2000/svg"  
              viewBox="0 0 512 512"
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h352a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32"/>
              <circle cx="256" cy="272" r="80" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M124 158v-22h-24v22"/>
            </svg>
          </div>
        </div>

        {/* Username Edit Section */}
        {editUsername ? (
          <div className="flex gap-4 mx-auto justify-center items-center">
            <input 
              type="text" 
              value={userDetails?.username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-xl w-full h-[44px] border border-gray-300 px-4" 
            />
          </div>
        ) : (
          <p className="text-center text-2xl font-bold">{userDetails?.username}</p>
        )}

        {/* Stats Section */}
        <div className="flex space-x-4 justify-center mt-4">
          <div className="flex gap-6 flex-col items-center">
            <p className="text-gray-500">Reviews</p>
            <p className="text-2xl font-bold">{userReviewCount}</p>
          </div>
          <div className="flex gap-6 flex-col items-center">
            <p className="text-gray-500">Followers</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
      
      <RecentUserActivity userComments={userComments} />
    </div>
  );
};

export default MyProfile;