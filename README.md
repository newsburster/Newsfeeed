# NewsApp - React News API with AdMob Integration

A modern, responsive news application built with React, TypeScript, and Tailwind CSS, featuring real-time news from NewsAPI.org and AdMob monetization.

## 🚀 Features

### News Functionality
- **Real-time News**: Fetches live news from NewsAPI.org
- **Category Filtering**: Browse news by categories (General, Business, Technology, Science, Health, Sports, Entertainment)
- **Search Functionality**: Search for specific topics and keywords
- **Detailed Article View**: Read full articles in an elegant modal
- **Responsive Design**: Optimized for all device sizes
- **Error Handling**: Graceful error handling with retry options

### AdMob Integration
- **Banner Ads**: Strategic placement at top, bottom, and inline positions
- **Interstitial Ads**: Full-screen ads shown every 3 articles read
- **Rewarded Video Ads**: Users earn coins by watching video ads
- **User Statistics**: Track articles read, coins earned, and ads watched
- **Smart Ad Timing**: Non-intrusive ad placement for better user experience

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Modern React**: Hooks, functional components, and latest React patterns
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom Hooks**: Reusable logic for news fetching and state management
- **Service Layer**: Clean separation of concerns with dedicated API services
- **Responsive Grid**: Adaptive layout that works on all screen sizes

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# News API Configuration
VITE_NEWS_API_KEY=ccda485a9e374807a1e1a5b1c2c56d1e
VITE_NEWS_API_BASE_URL=https://newsapi.org/v2

# AdMob Configuration
VITE_ADMOB_APP_ID=ca-app-pub-3525464829772650~3611777643
VITE_ADMOB_BANNER_ID=ca-app-pub-3525464829772650/8997842362
VITE_ADMOB_INTERSTITIAL_ID=ca-app-pub-3525464829772650/4575930367
VITE_ADMOB_REWARDED_ID=ca-app-pub-3525464829772650/3262848696
```

### API Keys Setup

1. **News API**: Get your free API key from [NewsAPI.org](https://newsapi.org/)
2. **AdMob**: Set up your AdMob account and create ad units at [AdMob Console](https://admob.google.com/)

## 📱 React Native Conversion

This web app is designed to be easily converted to React Native:

### Required Dependencies for React Native
```bash
npm install react-native-google-mobile-ads
npm install @react-native-async-storage/async-storage
```

### Key Changes for React Native
1. Replace web-based ad components with `react-native-google-mobile-ads`
2. Replace `localStorage` with `AsyncStorage`
3. Update image handling for React Native `Image` component
4. Replace web-specific navigation with React Navigation

### AdMob Integration for React Native
```javascript
import { BannerAd, InterstitialAd, RewardedAd } from 'react-native-google-mobile-ads';

// Banner Ad Component
<BannerAd
  unitId={adConfig.bannerId}
  size={BannerAdSize.FULL_BANNER}
  requestOptions={{
    requestNonPersonalizedAdsOnly: true,
  }}
/>
```

## 🎯 Monetization Strategy

### Ad Placement Strategy
- **Top Banner**: Immediate visibility without disrupting content
- **Inline Ads**: Every 6 articles to maintain engagement
- **Bottom Banner**: Persistent visibility during scrolling
- **Interstitial**: Every 3 articles read for maximum revenue
- **Rewarded Video**: Optional engagement for user rewards

### User Engagement
- **Coin System**: Users earn coins by watching rewarded ads
- **Statistics Tracking**: Gamification through reading stats
- **Non-intrusive Design**: Ads blend seamlessly with content

## 🔧 Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📊 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Error Boundaries**: Graceful error handling
- **Optimized Rendering**: Efficient React rendering patterns
- **Responsive Images**: Adaptive image loading
- **Caching**: Smart caching of API responses

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #1d4ed8)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale (#f9fafb to #111827)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Adaptive font sizes

### Components
- **Cards**: Elevated design with hover effects
- **Buttons**: Consistent styling with state variations
- **Modals**: Smooth animations and backdrop
- **Loading States**: Skeleton screens and spinners

## 📈 Analytics & Tracking

The app includes built-in analytics for:
- Articles read per session
- User engagement with ads
- Search queries and popular categories
- Time spent reading articles

## 🔒 Privacy & Security

- **API Key Security**: Environment variables for sensitive data
- **HTTPS Only**: Secure API communications
- **No Personal Data**: Minimal data collection
- **GDPR Compliant**: Privacy-first approach

## 🚀 Deployment

### Netlify Deployment
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy with automatic builds

### Vercel Deployment
1. Import project to Vercel
2. Configure environment variables
3. Deploy with zero configuration

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the FAQ section

---

Built with ❤️ using React, TypeScript, and Tailwind CSS