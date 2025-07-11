import Image from 'next/image';
import { companyType } from '../(main)/categories/[name]/page';
import Link from 'next/link';
import apiService from '../services/apiServices';
import StarRating from './rating/StarRating';

interface CompanyDetailProps {
  bestRatedCompnay: companyType;
}

const CompanyDetail: React.FC<CompanyDetailProps> = async ({ bestRatedCompnay }) => {
  const rating = await apiService.get(`review/average_rating/${bestRatedCompnay.id}/`);
  const review_count = await apiService.get(`review/review_count/${bestRatedCompnay.id}/`);

  return (
    <Link href={`/review/${encodeURIComponent(bestRatedCompnay.name)}?id=${bestRatedCompnay.id}`}>
      <div className="flex p-4 border rounded-xl hover:bg-primary-100 cursor-pointer space-x-6">
        {/* Image Container */}
        <div className="relative w-36 h-36 lg:w-24 lg:h-24 flex-shrink-0">
          <Image
            src={bestRatedCompnay?.logo}
            alt={bestRatedCompnay.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Company Details */}
        <div className="flex flex-col justify-center flex-1">
          <StarRating rating={rating} />
          <div className="mt-3">
            <p>Based on {review_count.review_count} reviews</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">{bestRatedCompnay.name}</p>
            <p className="text-sm">{bestRatedCompnay.location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyDetail;