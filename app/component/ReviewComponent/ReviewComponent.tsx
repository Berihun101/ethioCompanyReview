"use client";

import { useState, useEffect, useRef } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Rating from "@/app/component/rating/Rating";
import Image from "next/image";
import apiService from "@/app/services/apiServices";
import CustomButton from "../forms/CustomButton";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { companyType } from "@/app/(main)/categories/[name]/page";

interface ReviewComponentProps {
  userId: string | null;
  userDetail: any;
  company: companyType;
}

const ReviewComponent = ({ userId, userDetail, company }: ReviewComponentProps) => {
  const loginModal = useLoginModal();
  const hasTriggeredModal = useRef(false);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!userId && !hasTriggeredModal.current) {
      loginModal.open();
      hasTriggeredModal.current = true;
    }
  }, [userId, loginModal]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewId) {
      setError("Please complete your rating first");
      return;
    }
    
    if (!commentTitle.trim() || !commentBody.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = {
        title: commentTitle,
        body: commentBody,
      };

      await apiService.post(
        `review/comment/${reviewId}/`,
        JSON.stringify(formData)
      );

      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setCommentTitle("");
      setCommentBody("");
      
      // Refresh data after 2 seconds
      setTimeout(() => {
        router.push(
          `/review/${encodeURIComponent(company.name)}?id=${company.id}`
        );
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <>
      <div className="bg-primary-300 py-4 flex items-center justify-center w-full">
        <div className="flex mb-3 space-x-3 items-center">
          <div className="w-[60px] relative h-[60px] overflow-hidden">
            <Image
              src={company.logo}
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
        <Rating
          company={company}
          onReviewCreated={(id) => {
            setReviewId(id);
            setError(null);
          }}
        />
        
        <form onSubmit={handleReviewSubmit} className="p-6 w-full max-w-[600px]">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <p className="mt-4">Tell us about your experience</p>
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            className="w-full h-40 border border-primary-100 mt-2 rounded-xl p-4"
            placeholder="Write your review here"
            required
          />
          
          <p className="mt-3">Give your review a title</p>
          <input
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
            type="text"
            className="w-full border border-primary-100 mt-2 rounded-xl p-4"
            placeholder="Title"
            required
          />
          
          <CustomButton
            type="submit"
            label={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
            className="w-full mt-4 text-center"
          />
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-green-500 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="mb-6">We appreciate your valuable review.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-primary hover:bg-primary-500 rounded-xl text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewComponent;