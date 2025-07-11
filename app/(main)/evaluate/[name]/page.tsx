import Navbar from "@/app/component/Navbar";
import Rating from "@/app/component/rating/Rating";
import Image from "next/image";
import apiService from "@/app/services/apiServices";
import { getUserId } from "@/app/lib/actions";
import ReviewComponent from "@/app/component/ReviewComponent/ReviewComponent";

const EvaluatePage = async ({ params, searchParams }: { params: { name: string }; searchParams: { id: string } }) => {
    const id = searchParams.id; // Extract ID from query parameters
    const userId = await getUserId();

    let userDetail = null;

    try {
        if (userId) {
            userDetail = await apiService.get(`auth/${userId}`);
        }
    } catch (error) {
        console.error("Failed to fetch user details:", error);
    }

    const company = await apiService.get(`company/company_detail/${id}/`);

    return (
        <>
            
            <ReviewComponent userId={userId} userDetail={userDetail} company={company} />
        </>
    );
};

export default EvaluatePage;
