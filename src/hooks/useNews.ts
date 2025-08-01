import { useState, useEffect, useCallback } from 'react';
import { Article } from '../types/news';
import { fetchTopHeadlines, searchNews } from '../services/newsApi';

export const useNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const loadNews = useCallback(async (newCategory?: string, query?: string) => {
    setLoading(true);
    setError(null);

    try {
      let newsArticles: Article[];
      
      if (query && query.trim()) {
        newsArticles = await searchNews(query);
      } else {
        newsArticles = await fetchTopHeadlines(newCategory || category);
      }

      setArticles(newsArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setSearchQuery('');
    loadNews(newCategory);
  }, [loadNews]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      loadNews(undefined, query);
    } else {
      loadNews(category);
    }
  }, [loadNews, category]);

  const refreshNews = useCallback(() => {
    if (searchQuery.trim()) {
      loadNews(undefined, searchQuery);
    } else {
      loadNews(category);
    }
  }, [loadNews, category, searchQuery]);

  useEffect(() => {
    loadNews();
  }, []);

  return {
    articles,
    loading,
    error,
    category,
    searchQuery,
    handleCategoryChange,
    handleSearch,
    refreshNews,
  };
};