import { CompanyType } from "./CompanyType";
import { ResponseType } from "./ResponseType";
export const RoleName = {
  ADMIN: "admin",
  RECRUIT: "recruit",
  STAFF_RECRUIT: "staffRecruit",
  GUEST: "guest",
} as const;

export type UserRole = (typeof RoleName)[keyof typeof RoleName];

export type JobSaveResponse = {
  _id: string;
  companyId: { _id: string; companyName: string };
  location: string;
  maxRange: number;
  minRange: number;
  title: string;
  startDate: string;
  applicationDeadline: string;
};

export type CompanySaveResponse = {
  _id: string;
  companyName: string;
  address: string;
  country: string;
  logo: string;
};

export interface UserType {
  _id: string;
  email: string;
  fullname: string;
  avatarImg?: string;
  role: string;
  dob?: Date;
  address?: string;
  phone?: string;
  gender?: string;
  education?: string;
  skills?: string[];
  certificate?: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
  majorId?: string;
  companyId?: string | CompanyType; // Can be either string (ID) or populated CompanyType
  linkingProfile: string;
  listFavouritesCompanyID?: string[] | CompanySaveResponse[];
  listFavouritesJobsID?: string[] | JobSaveResponse[];
}
export type ResponseUserType<T> = ResponseType<T>;

export type FavouriteCompany = {
  id: string[];
};
