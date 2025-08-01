import React, { useState, useEffect } from 'react';
import { Trophy, Coins, Eye, Gift } from 'lucide-react';
import { getUserStats, addCoinsEarned, showRewardedAd, UserStats as UserStatsType } from '../services/admob';

const UserStats: React.FC = () => {
  const [stats, setStats] = useState<UserStatsType>(getUserStats());
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getUserStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchRewardedAd = async () => {
    setIsWatchingAd(true);
    try {
      const coinsEarned = await showRewardedAd();
      const newStats = addCoinsEarned(coinsEarned);
      setStats(newStats);
      alert(`Congratulations! You earned ${coinsEarned} coins! 🎉`);
    } catch (error) {
      console.error('Failed to show rewarded ad:', error);
    } finally {
      setIsWatchingAd(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
        Your Stats
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mx-auto mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.articlesRead}</p>
          <p className="text-xs text-gray-600">Articles Read</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full mx-auto mb-2">
            <Coins className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.coinsEarned}</p>
          <p className="text-xs text-gray-600">Coins Earned</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mx-auto mb-2">
            <Gift className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.adsWatched}</p>
          <p className="text-xs text-gray-600">Ads Watched</p>
        </div>
      </div>
      
      <button
        onClick={handleWatchRewardedAd}
        disabled={isWatchingAd}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Gift className="w-4 h-4" />
        <span>{isWatchingAd ? 'Watching Ad...' : 'Watch Ad for Coins'}</span>
      </button>
    </div>
  );
};

export default UserStats;