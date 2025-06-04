"use client";

import { useState, useEffect, useRef } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Rating from "@/app/component/rating/Rating";
import Image from "next/image";
import apiService from "@/app/services/apiServices";
import CustomButton from "../forms/CustomButton";
import { useRouter } from "next/navigation";

const ReviewComponent = ({ userId, userDetail, company }: any) => {
    const loginModal = useLoginModal();
    const hasTriggeredModal = useRef(false);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const [reviewId, setReviewId] = useState<number | null>(null); // Track review_id
    const router = useRouter();

    useEffect(() => {
        if (!userId && !hasTriggeredModal.current) {
            loginModal.open();
            hasTriggeredModal.current = true;
        }
    }, [userId, loginModal]);

    if (!userId) {
        return null; // Return nothing if the user is not logged in
    }

    const handleReviewSubmit = async () => {
        try {
            const formData = {
                title: commentTitle,
                body: commentBody,
            };

         const response =   await apiService.post(
                `review/comment/${reviewId}/`, // Use review_id
                JSON.stringify(formData)
            );

            router.push(
                `/review/${encodeURIComponent(company.name)}?id=${company.id}`
            );
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <>
            <div className="bg-primary-300 py-4 flex items-center justify-center w-full">
                <div className="flex mb-3 space-x-3 items-center">
                    <div className="w-[60px] relative h-[60px] overflow-hidden">
                        <Image
                            src="/item1.jpg"
                            alt="1"
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <p>{company.name}</p>
                        <div className="flex space-x-4">
                            <p className="text-grey-300">{company.website}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                {/* Render the Rating component */}
                <Rating
                    company={company}
                    onReviewCreated={(id) => setReviewId(id)} // Set review_id after rating
                />
                {/* Conditionally render the comment form if reviewId is set */}
                
                    <form className="p-6">
                        <p className="mt-4">Tell us about your experience</p>
                        <textarea
                            onChange={(e) => setCommentBody(e.target.value)}
                            className="w-[600px] h-40 border border-primary-100 mt-2 rounded-xl p-4"
                            placeholder="Write your review here"
                        ></textarea>
                        <p className="mt-3">Give your review a title</p>
                        <input
                            onChange={(e) => setCommentTitle(e.target.value)}
                            type="text"
                            className="w-[600px] border border-primary-100 mt-2 rounded-xl p-4"
                            placeholder="Title"
                        />
                        <CustomButton
                            onClick={handleReviewSubmit}
                            label="Submit"
                            className="w-full mt-4 text-center"
                        />
                    </form>
              
            </div>
        </>
    );
    
};

export default ReviewComponent;
