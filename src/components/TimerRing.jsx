import React from 'react';

export default function TimerRing({ timeRemaining, totalTime = 5 }) {
  const radius = 32;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeRemaining / totalTime) * circumference;

  // Determine stroke color based on remaining 5s time
  let strokeColor = '#22c55e'; // Green (5-4s)
  let shadowGlow = 'rgba(34, 197, 94, 0.4)';

  if (timeRemaining === 3 || timeRemaining === 2) {
    strokeColor = '#eab308'; // Yellow (3-2s)
    shadowGlow = 'rgba(234, 179, 8, 0.4)';
  } else if (timeRemaining <= 1) {
    strokeColor = '#ef4444'; // Red (1-0s)
    shadowGlow = 'rgba(239, 68, 68, 0.6)';
  }

  const isPulsing = timeRemaining <= 2 && timeRemaining > 0;

  return (
    <div className={`relative flex items-center justify-center ${isPulsing ? 'animate-bounce' : ''}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-300"
      >
        {/* Background Circle Track */}
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated Countdown Progress Ring */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
            filter: `drop-shadow(0 0 8px ${shadowGlow})`,
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Time Text display in center */}
      <span
        className="absolute font-mono font-extrabold text-sm sm:text-base transition-colors duration-300"
        style={{ color: strokeColor }}
      >
        {timeRemaining}s
      </span>
    </div>
  );
}
