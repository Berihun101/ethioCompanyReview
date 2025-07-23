"use client"
import Footer from "../Footer";
import ReviewNavbar from "../navbar/ReviewNavbar";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiServices";
import { use, useEffect, useState, useCallback } from "react";
import { companyType } from "@/app/(main)/categories/[name]/page";
import Link from "next/link";
import { reviewCommentType } from "../review/Review";
import Image from "next/image";
import ReviewerComments from "./ReviwerComments";
import useLoginModal from "@/app/hooks/useLoginModal";

export type userDetailType = {
    id:number,
    username:string,
    avatar_url:string,
}

export type ReviewerComment = {
    id:number,
    company:string,
    logo:string,
    rating:number,
    title:string,
    body:string,
    created_at:string,
    review_id:number,
}

const WriteReviews = () => {
  const [searchText, setSearchText] = useState("");
  const [companies, setCompanies] = useState<companyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewComments, setReviewComments] = useState<ReviewerComment[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loginPromptShown, setLoginPromptShown] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const login = useLoginModal();

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch reviewer comments
  const fetchreviewerComments = useCallback(async () => {
    try {
      const id = await getUserId();
      if (id) {
        const comment_data = await apiService.get(`review/reviewer_comments/${id}/`);
        setReviewComments(comment_data);
        setUserId(id);
      } else if (!loginPromptShown) {
        // Only show login prompt if it hasn't been shown before
        login.open();
        setLoginPromptShown(true);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [login, loginPromptShown]);

  // Fetch companies
  useEffect(() => {
    if (debouncedSearchText.trim() === "") {
      setCompanies([]);
      return;
    }

    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/review/search_companies?query=${debouncedSearchText}`
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [debouncedSearchText]);

  // Initial data fetch
  useEffect(() => {
    fetchreviewerComments();
  }, [fetchreviewerComments]);

  return (
    <>
      <div className="px-12 py-24 text-center bg-primary-900 w-full">
        <h1 className="text-3xl font-bold">What Company are you looking for?</h1>
        <input
          type="text"
          placeholder="Search for companies"
          className="w-[500px] mt-4 p-4 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search for companies"
        />
        {debouncedSearchText && (
          <div className="bg-white mt-2 box-shadow-xl p-4 max-w-md mx-auto">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : companies.length > 0 ? (
              <ul className="text-left text-black">
                {companies.map((company) => (
                  <li key={company.id} className="p-2 border-b border-primary">
                    <Link 
                      className="hover:text-primary" 
                      href={`/review/${encodeURIComponent(company.name)}?id=${company.id}`}
                    >
                      {company.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black">No results found.</p>
            )}
          </div>
        )}
      </div>

      <div className="p-12">
        {!userId ? (
          <div className="p-12 h-[700px] text-center">
            <div className="p-12">
              <h3 className="text-xl font-bold">
                Please login to view or write reviews
              </h3>
            
            </div>
          </div>
        ) : reviewComments.length === 0 ? (
          <div className="p-12 h-[700px] text-center">
            <div className="p-12">
              <h3 className="text-xl font-bold">You haven't reviewed any companies yet</h3>
              <p className="mt-4">Search for a company above to write your first review!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {reviewComments.map((reviewerComment) => (
              <ReviewerComments key={reviewerComment.id} reviewerComment={reviewerComment} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default WriteReviews;