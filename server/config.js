import 'dotenv/config';

const AUTH_SECRET = process.env.JWT;

const API_HOST = 'newsapi.org';
const API_KEY = process.env.REACT_APP_API_KEY;

const TOP_HEADLINES_URL = `/v2/top-headlines?language=en&apiKey=${API_KEY}`;
const TOP_HEADLINES_BY_CATEGORY_URL = `/v2/top-headlines?language=en&category=`;
const SEARCH_URL = `/v2/everything?language=en&q=`;
const API_KEY_URL = `&apiKey=${API_KEY}`;

export {
    AUTH_SECRET,
    API_HOST,
    TOP_HEADLINES_URL,
    TOP_HEADLINES_BY_CATEGORY_URL,
    SEARCH_URL,
    API_KEY_URL,
};