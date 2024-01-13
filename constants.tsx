export const buttonStyle =
  'p-1 text-center rounded cursor-pointer text-white bg-red-400 transition duration-300 hover:rotate-2 hover:bg-red-600/75';

export const API_URL = 'https://samliweisen.onrender.com/api/';

export const LOGIN_API = `${API_URL}user/login`;

export const USER_API = `${API_URL}user/detail`;

export const EXPENSE_LIST_API = `${API_URL}transactions/statistics`;

export const EXPENSE_NEW_API = `${API_URL}transactions/new`;

export const EXPENSE_UPDATE_API = (id: string) =>
  `${API_URL}transactions/${id}`;

export const EXPENSE_DELETE_API = (id: string) =>
  `${API_URL}transactions/${id}`;

export const EXPENSE_CATEGORIES_API = `${API_URL}transactions/categories`;

export const TODO_LIST_API = `${API_URL}todos`;

export const CONTACT_LIST_API = `${API_URL}contacts`;

export const COMMENT_LIST_API = `${API_URL}comments`;

export const BLOG_LIST_API = `${API_URL}blogs`;

export const VIDEO_LIST_API = `${API_URL}videos/bilibili`;

export const USER_AUTH_API = `${API_URL}user/auth`;
