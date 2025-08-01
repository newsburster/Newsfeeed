import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, AlertCircle } from 'lucide-react';
import { NewsCategory, Article } from './types/news';
import { useNews } from './hooks/useNews';
import { initializeAdMob } from './services/admob';

// Components
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import ArticleModal from './components/ArticleModal';
import LoadingSpinner from './components/LoadingSpinner';
import AdBanner from './components/AdBanner';
import UserStats from './components/UserStats';

const categories: NewsCategory[] = [
  { id: 'general', name: 'General', icon: '📰' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
];

function App() {
  const {
    articles,
    loading,
    error,
    category,
    searchQuery,
    handleCategoryChange,
    handleSearch,
    refreshNews,
  } = useNews();

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize AdMob when the app starts
    initializeAdMob().catch(console.error);
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NewsApp</h1>
                <p className="text-xs text-gray-500">Stay informed, stay ahead</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar
                onSearch={handleSearch}
                value={searchQuery}
                placeholder="Search news..."
              />
              <button
                onClick={refreshNews}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh news"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner Ad */}
      <AdBanner position="top" className="mx-4 mt-4 h-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="mb-6">
              <CategoryFilter
                categories={categories}
                activeCategory={category}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Current Category/Search Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Search results for "${searchQuery}"` : 
                 categories.find(cat => cat.id === category)?.name || 'General'} News
              </h2>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading latest news...' : `${articles.length} articles found`}
              </p>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 font-medium">Error loading news</p>
                </div>
                <p className="text-red-700 mt-1">{error}</p>
                <button
                  onClick={refreshNews}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <LoadingSpinner size="lg" text="Fetching the latest news..." />
            )}

            {/* News Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <React.Fragment key={`${article.url}-${index}`}>
                    <NewsCard
                      article={article}
                      onClick={() => handleArticleClick(article)}
                    />
                    {/* Inline Ad every 6 articles */}
                    {(index + 1) % 6 === 0 && (
                      <div className="md:col-span-2 lg:col-span-3">
                        <AdBanner position="inline" className="h-32" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 
                    'Try searching with different keywords or browse by category.' :
                    'No articles available for this category at the moment.'
                  }
                </p>
                <button
                  onClick={refreshNews}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Refresh News
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <UserStats />
            
            {/* Sidebar Ad */}
            <AdBanner position="inline" className="h-64" />
          </div>
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner position="bottom" className="mx-4 mb-4 h-24" />

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;