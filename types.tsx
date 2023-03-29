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
