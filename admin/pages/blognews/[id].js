"use client"
import FullLayout from "../../src/layouts/FullLayout";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useFakeNewsStore from "../../zustand/fakenews.zustand";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const { getSingleNews, singleNews, handleReaction } = useFakeNewsStore();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getSingleNews(router.query.id);
  }, []);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    await handleReaction(router.query.id); // Assuming this handles the like action
    // After handling the like action, fetch the updated news data
    getSingleNews(router.query.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  return (
    <FullLayout>
      <div className='flex flex-col justify-center items-center bg-white py-3'>
        <h1 className='mt-10 text-4xl font-bold max-w-[49rem] px-2 my-3'>{singleNews?.title}</h1>
        <div className='max-w-[49rem] px-2 mt-4'>
          <div className='flex justify-start my-3 flex-col '>
            <p className='text-left  text-lg'><span className='font-bold'>Author:</span> {singleNews?.author}</p>
            <p><span className='font-bold'>Published</span> : {formatDate(singleNews?.published)}</p>
          </div>
          <div onClick={handleLikeClick}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            {/* {singleNews?.likes?.length} */}
          </div>
          <div className="text-justify">
            {singleNews?.text}
          </div>
        </div>
      </div>
    </FullLayout>
  );
}