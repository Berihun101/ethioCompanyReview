import Image from "next/image";
import { ReviewerComment } from "./WriteReviews";

interface reviewerCommentProps {
    reviewerComment: ReviewerComment
}
const ReviewerComments:React.FC<reviewerCommentProps> = ({reviewerComment}) => {
    return (
        
        
        <div className="p-3 w-[400px] h-[300px] inset border-shadow-xl border">
        <div className="flex p-4 border rounded-xl hover:bg-primary-100 cursor-pointer space-x-6">
        {/* Image Container */}
        <div className="relative w-36 h-36 lg:w-24 lg:h-24 flex-shrink-0">
          <Image
            src={`http://localhost:8000${reviewerComment.logo}`}
            alt={reviewerComment.company}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Company Details */}
        <div className="flex flex-col justify-center flex-1">
          {/* <StarRating rating={rating} /> */}
          <div className="mt-3">
          </div>
          <div className="mt-4">
            <p className="font-bold">{reviewerComment.company}</p>
           
          </div>
        </div>
      </div>
        </div>
        
        
    )
}

export default ReviewerComments;