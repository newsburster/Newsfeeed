import React, { useEffect, useState } from 'react';
import { adConfig, showBannerAd } from '../services/admob';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'inline';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAd = async () => {
      try {
        await showBannerAd(adConfig.bannerId);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load banner ad:', error);
      }
    };

    loadAd();
  }, []);

  if (!isLoaded) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="animate-pulse-slow">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-gray-500 text-sm">Loading Ad...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg ${className}`}>
      <div className="p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">Ad</span>
          </div>
          <span className="text-blue-700 font-medium">Sponsored Content</span>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-1">
            {position === 'top' && "Stay Informed with Premium News"}
            {position === 'bottom' && "Discover More Stories"}
            {position === 'inline' && "Breaking News Alerts"}
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            Get unlimited access to quality journalism and breaking news updates.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Learn More
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Ad ID: {adConfig.bannerId.slice(-8)}
        </p>
      </div>
    </div>
  );
};

export default AdBanner;