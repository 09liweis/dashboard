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
  router: { asPath: String };
  lang: String;
}

export interface Transaction {
  id?: string;
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
  total: string;
  category: string;
  items: [Transaction];
}

export interface ExpenseListProps {
  categoryTransactions: CategoryTransaction[];
  openTransactionDetail: Function;
}

export interface ExpenseDatesProps {
  curMonth: string;
  curYear: string;
  setYear: Function;
  setMonth: Function;
}
