import React from 'react';

const ProgressRing = ({ value, max, label, unit, color = "from-primary-400 to-primary-600", size = 80 }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
      <div className="relative inline-flex items-center justify-center mb-3">
        <svg
          width={size}
          height={size}
          className="progress-ring transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="progress-ring-circle transition-all duration-500 ease-out"
          />
<defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${color?.split(' ')?.[0]?.replace('from-', 'text-') || 'text-blue-400'}`} stopColor="currentColor" />
              <stop offset="100%" className={`${color?.split(' ')?.[2]?.replace('to-', 'text-') || 'text-blue-600'}`} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{value}</span>
          <span className="text-xs text-gray-500">of {max}</span>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{unit}</p>
      </div>
    </div>
  );
};

export default ProgressRing;