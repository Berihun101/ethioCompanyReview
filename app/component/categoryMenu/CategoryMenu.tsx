"use client"
import { useRef, useState, useEffect } from 'react';
import styles from './CategoryMenu.module.css';
import apiService from '@/app/services/apiServices';
import { categoryType } from '../categoryItems/categoryList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CategoryMenu = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const router = useRouter();

  const handleScroll = (direction:any) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust for the number of items to scroll
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const getCategories = async () => {
    const url = "category/category_list/";
    const category = await apiService.get(url);
    setCategories(category);
  };

  useEffect(() => {
    getCategories();
  }, []);



  return (
    <div className="2xl:px-72 xl:px-48 lg:px-32 md:px-12 px-6 py-12">
      <div className="flex justify-between px-2 py-2">
        <h2 className="font-bold text-primary">What are you looking for?</h2>
        <div className="flex space-x-6">
          <div className='flex space-x-4'>
          <button
            onClick={() => handleScroll('left')}
            className="rounded-full bg-white text-primary p-3 border border-primary cursor-pointer hover:bg-primary-100"
          >
            {/* Left Arrow */}
            <svg className="text-primary w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z"/>
            </svg>
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="rounded-full bg-white text-primary p-3 border border-primary cursor-pointer hover:bg-primary-100"
          >
            {/* Right Arrow */}
            <svg className="text-primary w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/>
            </svg>
          </button>
          </div>
          <button onClick={() =>{router.push('categoriesList/')}} className="rounded-2xl bg-primary-100 text-primary hover:bg-primary hover:text-white px-4">See more</button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={`flex mt-4 space-x-12 overflow-x-auto ${styles.scrollContainer} `}
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        >
          {/* Category Items */}

          {categories.map((category, index) => (
             <div onClick={() => {router.push(`categories/${category.name}`)}} key={index} className="flex flex-col space-y-2 justify-center items-center flex-none cursor-pointer ">
             <Image className="object-cover h-full" src={`http://localhost:8000${category.icon}`} alt="contact" width={30} height={30} />

             <p className='text-center hover:underline'>{category.name}</p>
           </div>
          ))}

          
          


        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
