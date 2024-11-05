export type ElaboratedUser = {
  id: string;
  name: string;
  alias: string;
  email: string;
  image: string | null;
  birth: Date;
  phone: string;
  isOAuth: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserProps {
  user: Omit<ElaboratedUser, "isOAuth"> | null;
}

export interface Session {
  session?: ElaboratedUser;
}
