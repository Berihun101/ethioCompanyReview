import Image from "next/image";
import Navbar from "@/app/component/Navbar";
import Link from "next/link";
import Review from "@/app/component/review/Review";
import apiService from "@/app/services/apiServices";
import { getUserId } from "@/app/lib/actions";
import { userDetailType } from "@/app/component/writeReviews/WriteReviews";
import StarRating from "@/app/component/rating/StarRating";
import { companyType } from "@/app/(main)/categories/[name]/page";


export type userReviewType = {
  id:number,
  rating:number,
  reviewer: userDetailType,
  company: companyType
}

export type ratingType = {
  rating:number,
}


const CompanyReviewPage = async ({ params, searchParams }: { params: { name: string }; searchParams: { id: string } }) => {
  const { name } = params;
  const { id } = searchParams;

  const company = await apiService.get(`company/company_detail/${id}/`);
  const rating = await apiService.get(`review/average_rating/${company.id}/`);
  
  const review_count = await apiService.get(`review/review_count/${company.id}/`);
 

  let userDetail: userDetailType | null = null;
  let user_review: userReviewType | null = null;

  try {
    const userId = await getUserId();
    if (userId) {
      console.log("still there",userId)
      userDetail = await apiService.get(`auth/${userId}`);
      user_review = await apiService.get(`review/rating/${company.id}/`);
    }
  } catch (error) {
    console.log("You are not logged in");
  }

  return (
    <>
      
      <div className="2xl:px-72 xl:px-30 lg:px-12 md:px-6 px-4 mt-6 py-3">
        <div className="grid grid-cols-2 space-y-4 lg:grid-cols-3">
          <div className="flex col-span-2">
            <div className="rounded-xl relative h-[200px] overflow-hidden">
              <Image
                className="object-cover h-full"
                src={company.logo}
                alt="Company Logo"
                width={200}
                height={100}
              />
            </div>
            <div className="px-6">
              <h1 className="font-bold text-4xl">{company.name}</h1>
              <p className="text-sm">{company.location}</p>
              <StarRating rating={rating} />
              
              <div className="mt-3 flex space-x-4 items-center">
                <p className="text-sm">{review_count.review_count} reviews</p>
                <p className="text-primary">Excellent</p>
              </div>
            </div>
          </div>
          <div className="border col-span-1 lg:w-[80%] lg:h-[40%] p-3 rounded-xl hover:bg-primary-200 cursor-pointer border-primary">
            
              <div>
                <Link className="text-primary text-sm" href={company.website}>
                  {company.website}
                </Link>
                <p className="text-grey-300 text-sm">Visit the site</p>
              </div>
           
          </div>
        </div>
      </div>
      <Review review_count={review_count.review_count} userRating = {user_review} company={company} />
    </>
  );
};

export default CompanyReviewPage;
