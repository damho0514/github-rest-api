import React from "react";

export default function SkeletonUserItem() {
  return (
    <div className="flex justify-center">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 mt-12 gap-4 grid-cols-4">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors animate-pulse"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="w-24 h-4 bg-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col justify-start text-start space-y-2">
              <div className="w-20 h-4 bg-gray-300 rounded-md" />
              <div className="flex justify-between items-center">
                <div className="w-16 h-4 bg-gray-300 rounded-md" />
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
