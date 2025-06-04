import Image from 'next/image';
import Link from 'next/link';
import FilterBoard from '../FilterBoard';
import UserReview from './UserReview';
import AboutCompany from '../company/AboutCompany';
import { companyType } from '@/app/categories/[name]/page';
import { userReviewType } from '@/app/review/[site]/page';
import apiService from '@/app/services/apiServices';
import { getUserId } from '@/app/lib/actions';
import RelatedCompany from '../filterItem/RelatedCompany';
import { userDetailType } from '../writeReviews/WriteReviews';
interface ReviewProps {
  company: companyType;
  userRating: userReviewType | null; // Nullable in case the user hasn't rated yet
  review_count: number;
}

export type reviewCommentType = {
  id: number,
  title:string,
  body: string,
  created_at: string,
  review_id: number,
}

const Review: React.FC<ReviewProps> = async ({ company, userRating, review_count }) => {
  const totalStars = 5;

  const reviewComments = await apiService.get(`review/review_comments/${company.id}/`);
  const comments = reviewComments.comments;
  const company_id = company.id;
  const company_sector = company?.category.sector;
  const userId = await getUserId();
  let user: userDetailType | null = null;
  if(userId){
     user = await apiService.get(`auth/${userId}`);
  }
  
  
  

  return (
    <div className="bg-primary-100 3xl:px-96 xl:px-32 2xl-custom:px-64  lg:px-12 md:px-6 px-4 mt-6 py-3">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="col-span-2">
          <div className="rounded-xl border border-primary p-4 flex justify-between">
            <div className="flex space-x-3 items-center">
              <div className="w-[30px] relative h-[30px] rounded-full overflow-hidden">
                {user && (
                  <Image src={`http://localhost:8000/${user.avatar}`} alt="1" fill className="object-cover w-full h-full" />
                )}
              </div>
              
              {userRating?.rating  && userId? (<p className="text-primary p-3">Your Rating</p>): (<Link href={`/evaluate/${encodeURIComponent(company.name)}?id=${company.id}`}><p className="text-primary p-3">Write Review</p>  </Link>)}
               
            
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalStars }).map((_, index) => {
                const starIndex = index + 1; // Stars are 1-indexed
                return (
                  <div
                    key={starIndex}
                    className={`p-2 h-10 ${
                      userRating && starIndex <= userRating.rating
                        ? 'bg-primary' // Colored for rated stars
                        : 'bg-primary-200' // Uncolored for unrated stars
                    }`}
                  >
                    <svg
                      className="w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          <FilterBoard company={company} review_count={review_count} />
          {/* User Reviews */}
           {comments.map((comment:reviewCommentType, index:number) => (
                <UserReview companyId = {company_id} comment={comment} key={index} />
           ))}
            
          
        </div>

        {/* Company Details */}
        <div>
          <RelatedCompany company_sector={company_sector} />
          <AboutCompany company={company} />
        </div>
      </div>
    </div>
  );
};

export default Review;
