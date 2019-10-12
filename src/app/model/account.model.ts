import { Role } from "./role.model";
import { Profile } from "./profile.model";

export interface Account {
  id?: number;
  username?: string;
  password?: string;
  credentialsExpired?: boolean;
  credentialsExpiredDate?: Date;
  accountInfo?: AccountInfo;
  roleUser?: Role[];
  userProfile?: Profile[];
}

export interface AccountInfo {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
}