import { ratingType } from "@/app/(main)/review/[site]/page";

interface starRatingProps {
  rating:ratingType
}
const StarRating:React.FC<starRatingProps> = ({ rating }) => {
    const MAX_STARS = 5; // Maximum number of stars
    const filledStars = Math.floor(rating.rating); // Number of completely filled stars
    const halfStar = rating.rating % 1 >= 0.5; // Check if there's a half star
    const emptyStars = MAX_STARS - filledStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    return (
      <div className="flex items-center space-x-2 mt-3 space-x-1">
        {/* Render filled stars */}
        {[...Array(filledStars)].map((_, index) => (
          <div key={`filled-${index}`} className="p-2 bg-primary">
            <svg
              className="w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0z" />
            </svg>
          </div>
        ))}
        {/* Render half star */}
        {halfStar && (
          <div className="p-2 bg-primary">
            <svg
              className="w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
            </svg>
          </div>
        )}
        {/* Render empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <div key={`empty-${index}`} className="p-2 bg-primary-200">
            <svg
              className="w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9-1.7-23.5-9.7L437.8 220.2 331.6 56.7 264.7 44.3z" />
            </svg>
          </div>
        ))}
        <p>{rating.rating}</p>
      </div>
    );
  };

  export default StarRating;