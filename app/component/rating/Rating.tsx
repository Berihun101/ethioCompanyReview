"use client";

import { useState, useEffect } from "react";
import { companyType } from "@/app/(main)/categories/[name]/page";
import apiService from "@/app/services/apiServices";
import useLoginModal from "@/app/hooks/useLoginModal";
import { getUserId } from "@/app/lib/actions";

interface RatingProps {
    company: companyType;
    onReviewCreated?: (id: number) => void;
}

const Rating: React.FC<RatingProps> = ({ company, onReviewCreated }) => {
    const [hoveredStar, setHoveredStar] = useState(0); // Tracks the hovered star
    const [selectedStar, setSelectedStar] = useState(0); // Tracks the clicked (selected) star
    const [userId, setUserId] = useState<string | null>(null); // State to track userId
    const loginModal = useLoginModal();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await getUserId();
                setUserId(id);
                if (!id) {
                    loginModal.open(); // Open modal if user is not authenticated
                }
            } catch (error) {
                console.error("Error fetching userId:", error);
            }
        };

        fetchUserId();
    }, [loginModal]);

    const getColor = (index: number) => {
        const effectiveStar = hoveredStar || selectedStar; // Hover has priority over selection
        if (effectiveStar === 0) return "bg-primary-200"; // Default color
        if (effectiveStar <= 2)
            return index <= effectiveStar ? "bg-red-500" : "bg-primary-200"; // Red for first two stars
        if (effectiveStar <= 4)
            return index <= effectiveStar ? "bg-yellow-500" : "bg-primary-200"; // Yellow for first four stars
        return "bg-green-500"; // Green for all stars
    };

    const stars = [1, 2, 3, 4, 5];

    const handleRatingSubmit = async (star: number) => {
        try {
            setSelectedStar(star); // Optimistically set the selected star

            // Submit the rating
            const response = await apiService.post(
                `review/create/${company.id}/`,
                JSON.stringify({ rating: star })
            );

            // Fetch the updated rating and review ID
            const updatedRating = await apiService.get(
                `review/rating/${company.id}/`
            );

            if (updatedRating?.id) {
                setSelectedStar(updatedRating.rating); // Update the rating based on the response
                onReviewCreated?.(updatedRating.id); // Pass the review ID to the parent component
            } else {
                console.error("No review ID returned from the API.");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    if (!userId) {
        return null; // Prevent rendering if the user is not logged in
    }

    return (
        <div className="flex mt-3 space-x-1">
            {stars.map((star, index) => (
                <div
                    key={index}
                    className={`p-2 cursor-pointer ${getColor(star)}`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRatingSubmit(star)}
                >
                    <svg
                        className="w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default Rating;
