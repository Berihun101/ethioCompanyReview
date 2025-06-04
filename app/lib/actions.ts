"use server"

import { cookies } from "next/headers"
import { userDetailType } from "../component/writeReviews/WriteReviews"

import {jwtDecode }from "jwt-decode"

export async function handleLogin(userId: string, accessToken:string, refreshToken: string){
    const cookieStore = await cookies()

    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 60,
        path: '/'

    })

 


    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 60,
        path: '/'

    })

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.getAccessTokenNODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'

    })
}

export async  function resetAuthCookies(){
    const cookieStore = await cookies()
    console.log('sdfsdf')
    cookieStore.set('session_userid', '')
    cookieStore.set('session_user_detail', '')
    cookieStore.set('session_access_token', '')
    cookieStore.set('session_refresh_token', '')


}

export async function getUserId(){
    const cookieStore = await cookies()
    const userId = cookieStore.get('session_userid')?.value
    return userId? userId : null
}

export async function getUserFromJWT() {
  const token = await getAccessToken();

  if (!token) return null;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export async function getUserDetail(){
    const cookieStore = await cookies()
    const userDetail = cookieStore.get('session_user_detail')?.value
    return userDetail? JSON.parse(userDetail) : null
}

export async function getAccessToken(){
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('session_access_token')?.value
    return accessToken? accessToken : null
}


export async function refreshAccessToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("session_refresh_token")?.value;
  
    if (!refreshToken) {
      console.error("No refresh token available.");
      return null;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to refresh access token.");
      }
  
      const data = await response.json();
      const newAccessToken = data.access;
  
      cookieStore.set("session_access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });
  
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  }
  