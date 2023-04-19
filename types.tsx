export interface User {
  _id: string;
  nm: string;
  eml: string;
  lts: string;
}

export interface Blog {
  // _id: string;
  // title: string;
  // url: string;
  // content: string;
  // created_at: string;
  [key: string]: string;
}

export const emptyUser: User = { _id: '', nm: '', eml: '', lts: '' };

export interface LoginFormProps {
  setUser: Function;
  setShowLogin: Function;
}

export interface HeaderProps {
  user: User;
  setLang: Function;
  setUser: Function;
  setShowLogin: Function;
  router: { asPath: String };
  lang: String;
}

export interface Transaction {
  _id?: string;
  price?: number;
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

export interface CategoryTransaction {
  total: number;
  items: [Transaction];
}

export interface CategoryTransactions {
  [key: string]: CategoryTransaction;
}

export interface ExpenseListProps {
  categoryTransactions: CategoryTransactions;
  openTransactionDetail: Function;
}

export interface ExpenseDatesProps {
  curMonth: string;
  curYear: string;
  setYear: Function;
  setMonth: Function;
}
