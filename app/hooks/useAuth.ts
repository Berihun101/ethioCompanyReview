"use client";
import { useState, useEffect } from "react";
import { getUserId, getUserDetail } from "@/app/lib/actions";

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUserId = await getUserId();
      setUserId(currentUserId);
      
      if (currentUserId) {
        try {
          const details = await getUserDetail();
          setUserDetail(details);
        } catch (error) {
          console.error("Auth check failed:", error);
          setUserDetail(null);
        }
      } else {
        setUserDetail(null);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return { userId, userDetail };
};