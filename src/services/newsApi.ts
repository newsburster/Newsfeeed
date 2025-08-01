import axios from 'axios';
import { NewsResponse, Article } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL || 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const fetchTopHeadlines = async (
  category: string = 'general',
  country: string = 'us'
): Promise<Article[]> => {
  try {
    if (!API_KEY) {
      throw new Error('News API key is not configured');
    }

    const response = await newsApi.get<NewsResponse>('/top-headlines', {
      params: {
        category: category === 'general' ? undefined : category,
        country,
        pageSize: 20,
      },
    });

    return response.data.articles.map(transformArticle);
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error('Failed to fetch news. Please try again later.');
  }
};

export const searchNews = async (
  query: string,
  sortBy: string = 'publishedAt'
): Promise<Article[]> => {
  try {
    if (!API_KEY) {
      throw new Error('News API key is not configured');
    }

    if (!query.trim()) {
      return [];
    }

    const response = await newsApi.get<NewsResponse>('/everything', {
      params: {
        q: query,
        sortBy,
        pageSize: 20,
        language: 'en',
      },
    });

    return response.data.articles.map(transformArticle);
  } catch (error) {
    console.error('Error searching news:', error);
    throw new Error('Failed to search news. Please try again later.');
  }
};

const transformArticle = (article: Article): Article => ({
  ...article,
  urlToImage: article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800',
  description: article.description || 'No description available.',
  author: article.author || 'Unknown Author',
  content: article.content || article.description || 'Content not available.',
});

export default newsApi;