import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Spotify-inspired "G" with sound waves */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Main "G" shape */}
          <path
            d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z"
            fill="#3B82F6"
          />
          <path
            d="M16 8c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
            fill="#3B82F6"
          />
          <path
            d="M16 12c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
            fill="#3B82F6"
          />
          {/* Sound wave elements */}
          <path
            d="M20 16h2v2h-2v-2z"
            fill="#3B82F6"
            opacity="0.8"
          />
          <path
            d="M22 14h2v6h-2v-6z"
            fill="#3B82F6"
            opacity="0.6"
          />
          <path
            d="M24 12h2v10h-2V12z"
            fill="#3B82F6"
            opacity="0.4"
          />
        </svg>
      </div>
      
      {/* Logo Text */}
      {variant === 'full' && (
        <span className={`font-bold text-accent-primary ${textSizes[size]}`}>
          GbeduFlow
        </span>
      )}
    </div>
  );
};

export default Logo;
