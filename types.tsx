export interface UserType {
  _id: string;
  nm: string;
  eml: string;
  lts: string;
  roles?: Array<string>;
}

export interface BlogType {
  // _id?: string;
  // title?: string;
  // url?: string;
  // excerpt?: string;
  // className?: string;
  // created_at?: string;
  // content?: string;
  // projectName?: string;
  // projectUrl?: string;
  [key: string]: string;
}

export const emptyUser: UserType = { _id: '', nm: '', eml: '', lts: '' };

export interface LoginFormProps {
  setUser: Function;
  setShowLogin: Function;
}

export interface HeaderProps {
  user: UserType;
  setUser: Function;
  setShowLogin: Function;
  router: { pathname: String };
  lang: String;
}

export interface Knowledge {
  _id?: string;
  title: string;
  definition: string;
  categories: string[];
  createdAt?: string;
  updatedAt?: string;
}