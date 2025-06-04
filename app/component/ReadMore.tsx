"use client";
import Image from 'next/image';
import Link from 'next/link';
import useLoginModal from '../hooks/useLoginModal';
import { getUserId } from '../lib/actions';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"


const ReadMore = () => {
  const loginModal = useLoginModal();
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUserId(userId);
    };
    fetchUserId();
  }, []);

  const openLoginModal = () => {
    loginModal.open();
  };
  return (
    <div className="2xl:px-96 xl:px-48 lg:px-32 md:px-12 px-6 py-12">
      <div className="bg-primary text-white flex space-x-6 justify-center  rounded-xl px-6 py-6">
        <div className="py-3 flex flex-col justify-center ">
          <h1 className="font-bold text-2xl">Share us your experiance</h1>
          <p>
            Login to review your favorite company and share your experience with others
            </p>
            {userId ? (
              <Button className='w-[30%] bg-primary-200 mt-2' asChild>
              <Link href="/writeReview" className="text-white hover:text-primary-200">
                Write Review
              </Link>
              </Button>
            ) : (
              <Button className='w-[30%] bg-primary-200 mt-2' onClick={openLoginModal} asChild>
      <Link href="">Login</Link>
    </Button>
            )}
                
           
      </div>
      <div className='relative object-cover rounded-xl  aspect-square overflow-hidden'>
        <Image className='h-full' src='/item6.jpg' alt='item' width={400} height={400}  />
      </div>

       
      </div>
      
    </div>
  );
};

export default ReadMore;
