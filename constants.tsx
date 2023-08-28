export const buttonStyle =
  'p-1 text-center rounded cursor-pointer text-white bg-red-400 transition duration-300 hover:rotate-2 hover:bg-red-600/75';

export const API_SERVER = 'https://samliweisen.onrender.com/api/';

export const LOGIN_API = `${API_SERVER}user/login`;

export const USER_API = `${API_SERVER}user/detail`;

export const EXPENSE_LIST_API = `${API_SERVER}transactions/statistics`;

export const EXPENSE_NEW_API = `${API_SERVER}transactions/new`;

export const EXPENSE_UPDATE_API = (id: string) =>
  `${API_SERVER}transactions/${id}`;

export const EXPENSE_DELETE_API = (id: string) =>
  `${API_SERVER}transactions/${id}`;

export const EXPENSE_CATEGORIES_API = `${API_SERVER}transactions/categories`;

export const TODO_LIST_API = `${API_SERVER}todos`;

export const CONTACT_LIST_API = `${API_SERVER}contacts`;

export const COMMENT_LIST_API = `${API_SERVER}comments`;

export const BLOG_LIST_API = `${API_SERVER}blogs`;

export const VIDEO_LIST_API = `${API_SERVER}visuals/bilibili`;

export const USER_AUTH_API = `${API_SERVER}user/auth`;
