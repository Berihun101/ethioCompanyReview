import Image from "next/image";
import { userReviewType } from "../(main)/review/[site]/page";
import apiService from "../services/apiServices";
import { userDetailType } from "./writeReviews/WriteReviews";
import Link from "next/link";
import { reviewCommentType } from "./review/Review";
import RenderStars from "./rating/RenderStars";

interface RecentReviewProps {
  recentReview: userReviewType;
}

const RecentReviewDetail: React.FC<RecentReviewProps> = async ({ recentReview }) => {
  const user: userDetailType = await apiService.get(`auth/${recentReview.reviewer}/`);
  const comment: reviewCommentType = await apiService.get(
    `review/review_comments/${user.id}/${recentReview.company.id}/`
  );
  const userRating = await apiService.get(
    `review/reviewer_rating/${recentReview.reviewer}/${recentReview.company.id}/`
  );

  console.log('userrating',userRating);
  console.log('user', user);

  // Function to render stars based on rating value
 

  return (
    <div className="rounded-xl hover:border-primary border border-3 p-3">
      <div className="flex space-x-3">
        <div className="object-cover rounded-full overflow-hidden">
          <Image   src={user.avatar_url} alt="avatar image" width={80} height={80} />
        </div>
        <div>
          <h3>{user.username}</h3>
          <div className=" border border-4 border-primary">
            {/* Render the stars based on userRating */}
          
            <RenderStars rating={userRating.rating} />
          </div>
        </div>
      </div>
      <div className="py-3 mb-3 border-b-3">
        <p>{comment.body}</p>
      </div>
      <div className="flex text-center mb-4">
        <hr className="w-full border-t-2 border-primary-100" />
      </div>
      <div className="flex space-x-4">
        <div className="object-cover rounded-full overflow-hidden">
          <Image
            src={recentReview.company.logo}
            alt="1"
            width={80}
            height={80}
          />
        </div>
        <div>
          <Link
            className="hover:text-red w-full block"
            href={`/review/${encodeURIComponent(recentReview.company.name)}?id=${recentReview.company.id}`}
          >
            {recentReview.company.name}
          </Link>
          <Link className="hover:underline text-sm" href={recentReview.company.website}>
            {recentReview.company.website}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentReviewDetail;
