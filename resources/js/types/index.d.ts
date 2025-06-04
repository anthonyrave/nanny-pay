export interface User {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at?: string;
  phone_number?: string;
  address_line_1?: string;
  address_line_2?: string;
  postcode?: string;
  city?: string;
  contracts: Contract[];
}

export interface Contract {
  id: number;
  child_firstname: string;
  child_lastname: string;
}

export interface FormHandle {
  submit: () => void;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};
