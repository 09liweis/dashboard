export const LANGUAGES = {
  en: {
    home: 'Home',
    login: 'Login',
    logout: 'Log Out',
    addNew: 'Add New',
    subscription: 'Subscription',
    comments: 'Comments',
    blogs: 'Blogs',
    faq: 'FAQ',
    updating: 'Updating',
    update: 'Update',
    lost: 'Are you lost?',
    videos: 'Videos',
  },
  zh: {
    home: '页面',
    Resume: '简历',
    videos: 'Vlog',
    logout: '登出',
    total: '总计',
    addNew: '添加',
    subscription: '订阅',
    comments: '评论',
    blogs: '博客',
    faq: '问答',
    updating: '更新中',
    update: '更新',
    lost: '你迷路了吗?',
    login: '登录'
  },
};

export function getLanguageKeys() {
  return [
    { k: 'en', v: 'English' },
    { k: 'zh', v: '中文' },
  ];
}

export function getLanguages(lang) {
  return LANGUAGES[lang];
}

export function getTranslate(lang, key) {
  return lang[key] || key;
}
