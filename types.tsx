export interface User {
  _id: string;
  nm: string;
  eml: string;
  lts: string;
}

export const emptyUser: User = { _id: '', nm: '', eml: '', lts: '' };

export interface LoginFormProps {
  setUser: Function;
}

export interface HeaderProps {
  user: User;
  setLang: Function;
  setUser: Function;
  setShowLogin: Function;
  router: { pathname: String };
  lang: String;
}
