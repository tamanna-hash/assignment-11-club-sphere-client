import React from 'react'

const Skeleton = () => {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg bg-white animate-pulse">
      {/* Image Skeleton - Smaller height */}
      <div className="h-32 min-h-32 overflow-hidden relative rounded-t-lg bg-gray-200">
        <div className="h-full w-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        
        {/* Heart button skeleton - Smaller */}
        <div className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-gray-300/50">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton - Smaller padding */}
      <div className="p-3 bg-white flex flex-col -mt-2 rounded-b-lg shadow-md h-full">
        {/* Club name skeleton - Smaller */}
        <div className="h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md mb-2 w-3/4"></div>
        
        {/* Location skeleton - Smaller */}
        <div className="h-3 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md mb-2 w-1/2"></div>
        
        {/* Description skeleton - 2 lines, smaller */}
        <div className="space-y-1.5 mt-1.5">
          <div className="h-3 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-full"></div>
          <div className="h-3 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-4/5"></div>
        </div>

        {/* Price and category skeleton - Smaller */}
        <div className="mt-2.5 mb-1 flex justify-between items-center">
          <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-14"></div>
          <div className="h-5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full w-16"></div>
        </div>

        {/* Button skeleton - Smaller */}
        <div className="mt-auto">
          <div className="h-7 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-full"></div>
        </div>
      </div>
    </div>
  )
}

// Multiple skeleton cards component - 4 columns
export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  )
}

export default Skeleton