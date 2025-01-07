// 'use client'

// import React, { useState, useEffect } from 'react';

// interface Review {
//     id: number;
//     name: string;
//     isVerifiedBuyer?: boolean;
//     isVerifiedReviewer?: boolean;
//     date: string;
//     rating: number;
//     title: string;
//     comment: string;
//   }

// const ReviewCarousel = () => {
//   const reviewsData: Review[] = [
//     {
//       id: 1,
//       name: 'Srushti',
//       isVerifiedBuyer: true,
//       date: '01/05/25',
//       rating: 5,
//       title: 'very good',
//       comment: 'i have been using this serum from past 5 month and the result is mind-blowing... my acne scars are reduced a lot. gonna purchase 2nd bottle'
//     },
//     {
//       id: 1,
//       name: 'Srushti',
//       isVerifiedBuyer: true,
//       date: '01/05/25',
//       rating: 5,
//       title: 'very good',
//       comment: 'i have been using this serum from past 5 month and the result is mind-blowing... my acne scars are reduced a lot. gonna purchase 2nd bottle'
//     },
//     {
//       id: 3,
//       name: 'Raghav V.',
//       isVerifiedReviewer: true,
//       date: '01/05/25',
//       rating: 5,
//       title: 'good',
//       comment: 'this helps my skin very much'
//     }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [reviews] = useState(reviewsData);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
//     );
//   };

//   const visibleReviews = [reviews[currentIndex]];

//   const renderStars = (rating: number) => (
//     <div className="flex mb-2">
//       {Array.from({ length: 5 }, (_, index) => (
//         <svg
//           key={index}
//           className={`w-5 h-5 ${index < rating ? 'text-black' : 'text-gray-300'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   );

//   return (
//     <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//       <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
      
//       <div className="relative">
//         <div className="grid grid-cols-1 gap-6">
//           {visibleReviews.map((review) => (
//             <div 
//               key={review.id}
//               className="bg-white p-6 rounded-lg border border-gray-200"
//             >
//               {/* Review header with user info and date */}
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-medium">{review.name}</h3>
//                   <span className="text-sm text-gray-500">
//                     {review.isVerifiedBuyer ? 'Verified Buyer' : 'Verified Reviewer'}
//                   </span>
//                 </div>
//                 <span className="text-sm text-gray-500">{review.date}</span>
//               </div>
              
//               {/* Rating stars */}
//               {renderStars(review.rating)}
              
//               {/* Review title and comment */}
//               <h4 className="font-medium text-lg mb-2">{review.title}</h4>
//               <p className="text-gray-600">{review.comment}</p>
//             </div>
//           ))}
//         </div>

//         {/* Navigation buttons */}
//         <button
//           onClick={handlePrevious}
//           className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 
//                    bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none z-10"
//           aria-label="Previous review"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
        
//         <button
//           onClick={handleNext}
//           className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 
//                    bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none z-10"
//           aria-label="Next review"
//         >
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewCarousel;

'use client'

import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  isVerifiedBuyer?: boolean;
  isVerifiedReviewer?: boolean;
  date: string;
  rating: number;
  title: string;
  comment: string;
}

const ReviewCarousel = () => {
  const reviewsData: Review[] = [
    {
      id: 1,
      name: 'Srushti',
      isVerifiedBuyer: true,
      date: '01/05/25',
      rating: 5,
      title: 'very good',
      comment: 'i have been using this serum from past 5 month and the result is mind-blowing... my acne scars are reduced a lot. gonna purchase 2nd bottle',
    },
    {
      id: 2,
      name: 'Arjun',
      isVerifiedBuyer: true,
      date: '01/04/25',
      rating: 4,
      title: 'Works well',
      comment: 'My skin feels smoother after using this.',
    },
    {
      id: 3,
      name: 'Raghav V.',
      isVerifiedReviewer: true,
      date: '01/03/25',
      rating: 5,
      title: 'good',
      comment: 'This helps my skin very much',
    },
    {
      id: 4,
      name: 'Priya',
      isVerifiedBuyer: true,
      date: '12/28/24',
      rating: 5,
      title: 'Amazing',
      comment: 'This product changed my skincare routine!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + (isMobile ? 1 : 3)) % reviewsData.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - (isMobile ? 1 : 3) + reviewsData.length) % reviewsData.length
    );
  };

  const visibleReviews = isMobile
    ? [reviewsData[currentIndex]]
    : reviewsData.slice(currentIndex, currentIndex + 3).concat(
        reviewsData.slice(0, Math.max(0, currentIndex + 3 - reviewsData.length))
      );

  const renderStars = (rating: number) => (
    <div className="flex mb-2">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-black' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              {/* Review header with user info and date */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <span className="text-sm text-gray-500">
                    {review.isVerifiedBuyer ? 'Verified Buyer' : 'Verified Reviewer'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              {/* Rating stars */}
              {renderStars(review.rating)}

              {/* Review title and comment */}
              <h4 className="font-medium text-lg mb-2">{review.title}</h4>
              <p className="text-gray-600 truncate">
                {review.comment.length > 50
                  ? review.comment.slice(0, 50) + '...'
                  : review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 
                   bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none z-10"
          aria-label="Previous review"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 
                   bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none z-10"
          aria-label="Next review"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
