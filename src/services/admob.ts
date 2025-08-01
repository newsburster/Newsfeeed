import { AdConfig, UserStats } from '../types/news';

// AdMob Configuration
export const adConfig: AdConfig = {
  appId: import.meta.env.VITE_ADMOB_APP_ID || 'ca-app-pub-3525464829772650~3611777643',
  bannerId: import.meta.env.VITE_ADMOB_BANNER_ID || 'ca-app-pub-3525464829772650/8997842362',
  interstitialId: import.meta.env.VITE_ADMOB_INTERSTITIAL_ID || 'ca-app-pub-3525464829772650/4575930367',
  rewardedId: import.meta.env.VITE_ADMOB_REWARDED_ID || 'ca-app-pub-3525464829772650/3262848696',
};

// User Statistics Management
const STORAGE_KEY = 'newsapp_user_stats';

export const getUserStats = (): UserStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    articlesRead: 0,
    coinsEarned: 0,
    adsWatched: 0,
  };
};

export const updateUserStats = (updates: Partial<UserStats>): UserStats => {
  const current = getUserStats();
  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const incrementArticlesRead = (): UserStats => {
  const current = getUserStats();
  return updateUserStats({
    articlesRead: current.articlesRead + 1,
  });
};

export const addCoinsEarned = (coins: number): UserStats => {
  const current = getUserStats();
  return updateUserStats({
    coinsEarned: current.coinsEarned + coins,
    adsWatched: current.adsWatched + 1,
  });
};

// Ad Management Functions
export const shouldShowInterstitial = (articlesRead: number): boolean => {
  return articlesRead > 0 && articlesRead % 3 === 0;
};

export const showBannerAd = (adUnitId: string = adConfig.bannerId): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`[AdMob] Showing banner ad: ${adUnitId}`);
    // In a real React Native app, this would call the actual AdMob SDK
    setTimeout(resolve, 100);
  });
};

export const showInterstitialAd = (adUnitId: string = adConfig.interstitialId): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`[AdMob] Showing interstitial ad: ${adUnitId}`);
    // In a real React Native app, this would call the actual AdMob SDK
    setTimeout(resolve, 2000);
  });
};

export const showRewardedAd = (adUnitId: string = adConfig.rewardedId): Promise<number> => {
  return new Promise((resolve) => {
    console.log(`[AdMob] Showing rewarded ad: ${adUnitId}`);
    // In a real React Native app, this would call the actual AdMob SDK
    const coinsEarned = Math.floor(Math.random() * 10) + 5; // 5-14 coins
    setTimeout(() => resolve(coinsEarned), 3000);
  });
};

// Initialize AdMob (for React Native)
export const initializeAdMob = async (): Promise<void> => {
  console.log(`[AdMob] Initializing with App ID: ${adConfig.appId}`);
  // In a real React Native app, this would initialize the AdMob SDK
  return Promise.resolve();
};