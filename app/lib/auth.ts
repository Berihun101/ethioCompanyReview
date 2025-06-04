// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET!; // Store this in .env file

// export async function getUserFromJWT() {
//     const cookieStore = await cookies()
//     const token = cookieStore
//     .get("session_token")?.value;

//     if (!token) return null;
    
//     try {
//         return jwt.verify(token, SECRET_KEY); // Decode JWT
//     } catch (error) {
//         return null; // Invalid token
//     }
// }

