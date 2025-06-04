import Image from 'next/image';
import { reviewCommentType } from './Review';
import apiService from '@/app/services/apiServices';
import StarRating from '../rating/StarRating';
import { getUserId } from '@/app/lib/actions';
import LikeButton from '../forms/LikeButton';

// Utility to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA'); // Outputs "YYYY-MM-DD"
};

// Utility to calculate time difference
const timeAgo = (dateString: string): string => {
  const createdAt = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } 
  else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
};

interface UserReviewProps {
  comment: reviewCommentType;
  companyId: number;
}

const UserReview: React.FC<UserReviewProps> = async ({ comment, companyId }) => {
  const reviewId = comment.review_id;
  const reviewerDetail = await apiService.get(`review/reviewer/${reviewId}/`);
  const userRating = await apiService.get(`review/reviewer_rating/${reviewerDetail.id}/${companyId}/`);
  const user_review_count = await apiService.get(`review/user_review_count/${reviewerDetail.id}/`);
  const userId = await getUserId();


  


  return (
    <div className="rounded-xl mt-6 border border-primary bg-white px-4 py-3">
      <div className="flex mb-3 space-x-3 items-center">
        <div className="w-[30px] relative h-[30px] rounded-full overflow-hidden">
          <Image src={`http://localhost:8000/${reviewerDetail.avatar}`} alt="Reviewer Avatar" fill className="object-cover w-full h-full" />
        </div>
        <div>
          <p>{reviewerDetail.reviewer}</p>
          <div className="flex space-x-4">
            <p className="text-grey-300">{user_review_count} reviews</p>
            <div className="flex space-x-1">
              <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
              <p>Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-100">
        <div className="mt-3 flex justify-between">
          <StarRating rating={userRating} />
          <p className="text-grey-300">{timeAgo(comment.created_at)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold">{comment.title}</h3>
        <p>{comment.body}</p>
      </div>

      <div className="mt-3 flex space-x-4">
        <p className="font-bold text-grey-300">Date of Experience:</p>
        <p>{formatDate(comment.created_at)}</p>
      </div>

      
       <LikeButton commentId={comment.id} userId={userId} />
    </div>
  );
};

export default UserReview;
