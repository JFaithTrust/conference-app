import React from "react";

const CarouselSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-row gap-8 justify-center w-full h-full"
    >
      <div className="flex items-center justify-center">
        <div className="w-[600px] h-[400px] flex flex-col gap-y-4">
          <div className="h-14 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px]"></div>
          <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[250px]"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-300 rounded-xl dark:bg-gray-700 w-[600px] h-[400px] flex items-center justify-center">
          <svg
            className="text-gray-200 dark:text-gray-600 w-[50px] h-[50px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CarouselSkeleton;
