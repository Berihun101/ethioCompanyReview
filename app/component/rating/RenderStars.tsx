

interface RenderStarsProps {
    rating: number;
  }

const RenderStars:React.FC<RenderStarsProps> = ({rating}) => {
    const totalStars = 5; // Assuming a 5-star system
    const filledStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - filledStars - halfStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <span key={`filled-${index}`} className="text-blue text-2xl">★</span>
        ))}
        {halfStars > 0 && <span className="text-yellow-500">☆</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300  text-2xl">★</span>
        ))}
      </>
    );
  };

  export default RenderStars