import React from 'react';

function SkeletonCard(){
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
      
      {/* Title Placeholder */}
      <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-3"></div>
      
      {/* Subtitle/Category Placeholder*/}
      <div className="h-3 bg-slate-100 rounded-md w-1/2 mb-6"></div>
      
      {/* Price & Button Row */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-6 bg-slate-200 rounded-md w-20"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;