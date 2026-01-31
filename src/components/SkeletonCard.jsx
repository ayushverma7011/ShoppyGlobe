import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm animate-pulse">
      {/* 1. Image Placeholder */}
      <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
      
      {/* 2. Title Placeholder (Longer bar) */}
      <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-3"></div>
      
      {/* 3. Subtitle/Category Placeholder (Shorter bar) */}
      <div className="h-3 bg-slate-100 rounded-md w-1/2 mb-6"></div>
      
      {/* 4. Price & Button Row */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-6 bg-slate-200 rounded-md w-20"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;