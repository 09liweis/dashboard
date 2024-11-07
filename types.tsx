export interface UserType {
  _id: string;
  nm: string;
  eml: string;
  lts: string;
  roles?: Array<string>;
}

export interface BlogType {
  // _id: string;
  // title: string;
  // url: string;
  // content: string;
  // created_at: string;
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

export interface Transaction {
  _id?: string;
  price?: string;
  income?:boolean;
  date?: string;
  title?: string;
  place?: {
    _id?: string;
    name?: string;
    address?: string;
    place_id?: string;
    lat?: number;
    lng?: number;
  };
}

export interface ExpenseResponse {
  total: string;
  incomes:string;
  expenses:string;
  date:string;
  categoryPrice:CategoryTransaction[]
}

export interface CategoryTransaction {
  total: string;
  income: boolean;
  category: string;
  percentage: string;
  items: Transaction[];
}

export interface ExpenseListProps {
  categoryTransactions: CategoryTransaction[];
  openTransactionDetail: Function;
}

export interface Knowledge {
  nm: string,
  items?: Array<Knowledge> | Array<string>,
  pros?: string | Array<string>,
  what?: string,
  how?: string | Array<string>,
  why?: string,
  url?: string
}