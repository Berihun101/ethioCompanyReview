
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import RecentReviewDetail from './RecentReviewDetail';
import apiService from '../services/apiServices';
import { userReviewType } from '../(main)/review/[site]/page';



const RecentReview = async () => {
    // const scrollContainerRef = useRef<HTMLDivElement>(null);
   

    // const handleScroll = (direction:any) => {
    //   if (scrollContainerRef.current) {
    //     const scrollAmount = 200; // Adjust for the number of items to scroll
    //     if (direction === 'left') {
    //       scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    //     } else {
    //       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    //     }
    //   }
    // };
    
    
    
      const recentReviews = await apiService.get('review/recent_reviews/')
        
  

 


  return (
    <div className="p-12 rounded-xl border">
        <div className="flex justify-between p-4">
        <h2>Recent Review</h2>
        <div className='flex space-x-4'>
          <button
            // onClick={() => handleScroll('left')}
            className="rounded-full bg-white text-primary p-3 border border-primary cursor-pointer hover:bg-primary-100"
          >
            {/* Left Arrow */}
            <svg className="text-primary w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z"/>
            </svg>
          </button>
          <button
            // onClick={() => handleScroll('right')}
            className="rounded-full bg-white text-primary p-3 border border-primary cursor-pointer hover:bg-primary-100"
          >
            {/* Right Arrow */}
            <svg className="text-primary w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/>
            </svg>
          </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 ld:grid-cols-3 p-4 gap-4">

          {recentReviews.map((recentReview:userReviewType, index:any) =>(
            <RecentReviewDetail key={index} recentReview = {recentReview} />
          ))}
            

            
        </div>
      
      
    </div>
  );
}

export default RecentReview;