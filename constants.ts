export const API_URL = 'https://samliweisen.onrender.com/api/';

export const COMMENT_LIST_API = `${API_URL}comments`;

export const STATS_LIST_API = `${API_URL}stats`;

export const NAV_LINKS = [
  { tl: "Home", url: "/", icon: "house-user" },
  { tl: "About", url: "/resume", icon: "user" },
  { tl: "Cost Calculator", url: "/calculator", icon: "book" },
  { tl: "Blogs", url: "/blogs", icon: "piggy-bank" },
  { tl: "FAQs", url: "/faq", icon: "comments" },
  { tl: "Comments", url: "/comments", icon: "comment" },
] as const;