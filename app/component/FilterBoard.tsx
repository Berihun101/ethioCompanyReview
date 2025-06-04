import { companyType } from "../categories/[name]/page";
import apiService from "../services/apiServices";

interface FilterBoardProps {
  review_count: number;
  company: companyType;
}

export type reviewPercentageType = {
  
    rating_5: number,
    rating_4: number,
    rating_3: number,
    rating_2: number,
    rating_1: number,

  
}


const FilterBoard:React.FC<FilterBoardProps> = async ({review_count, company}) => {
  const get_review:reviewPercentageType = await apiService.get(`review/get_review/${company.id}/`);

    return (
      <div className="rounded-xl p-4 mt-6 bg-white border shadow-xl border-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Notice ⭐️</h2>
          <span className="text-lg">{company.average_rating}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold">Total Reviews:</p>
          <span className="text-sm">{review_count}</span>
        </div>
        <div className="flex flex-col space-y-3">
          {/* Column 1: Checkboxes */}
          <div className="flex  items-center space-x-2">
            <input className="w-4 h-4" type="checkbox" />
            <p className="w-[80px]">5 stars</p>
            <div className="rounded-xl w-full h-2 bg-primary-100"></div>
            <p className="w-[50px]">{get_review.rating_5}%</p>
            
          </div>
          
          <div className="flex  items-center space-x-2">
            <input className="w-4 h-4" type="checkbox" />
            <p className="w-[80px]">4 stars</p>
            <div className="rounded-xl w-full h-2 bg-primary-100"></div>
            <p className="w-[50px]">{get_review.rating_4}%</p>
            </div>

            <div className="flex  items-center space-x-2">
            <input className="w-4 h-4" type="checkbox" />
            <p className="w-[80px]">3 stars</p>
            <div className="rounded-xl w-full h-2 bg-primary-100"></div>
            <p className="w-[50px]">{get_review.rating_3}%</p>
             </div>

             <div className="flex  items-center space-x-2">
            <input className="w-4 h-4" type="checkbox" />
            <p className="w-[80px]">2 stars</p>
            <div className="rounded-xl w-full h-2 bg-primary-100"></div>
            <p className="w-[50px]">{get_review.rating_2}%</p>
            
          </div>

          <div className="flex  items-center space-x-2">
            <input className="w-4 h-4" type="checkbox" />
            <p className="w-[80px]">1 stars</p>
            <div className="rounded-xl w-full h-2 bg-primary-100"></div>
            <p className="w-[50px]">{get_review.rating_1}%</p>
            
          </div>

        </div>
      </div>
    );
  };
  
  export default FilterBoard;
  