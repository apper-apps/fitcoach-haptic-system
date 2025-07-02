import React from 'react';

const Loading = ({ type = 'default' }) => {
  if (type === 'dashboard') {
    return (
      <div className="p-4 space-y-6">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded-lg w-48 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-32 shimmer"></div>
        </div>

        {/* Progress rings skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-gray-200 rounded-full shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-12 shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded w-32 shimmer"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-lg shimmer"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 shimmer"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;