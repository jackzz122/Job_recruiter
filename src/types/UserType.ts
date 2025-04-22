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
export type educationType = {
  _id: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
};
export type workExType = {
  _id: string;
  jobTitle: string;
  company: string;
  responsibilites: string;
  startDate: string;
  endDate: string;
};
export type certificateType = {
  _id: string;
  name: string;
  organization: string;
  month: number;
  year: number;
};
export type projectType = {
  _id: string;
  projectName: string;
  link: string;
  description: string;
};
export interface UserType {
  _id: string;
  email: string;
  fullname: string;
  avatarImg?: string;
  role: string;
  dob?: Date;
  aboutMe?: string;
  address?: string;
  avatarIMG?: string;
  phone?: string;
  gender?: string;
  education?: educationType[];
  skills?: string[];
  workEx?: workExType[];
  projects?: projectType[];
  certificate?: certificateType[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
  majorId?: string;
  companyId?: string | CompanyType;
  linkingProfile: string;
  listFavouritesCompanyID?: string[] | CompanySaveResponse[];
  listFavouritesJobsID?: string[] | JobSaveResponse[];
}
export type ResponseUserType<T> = ResponseType<T>;

export type FavouriteCompany = {
  id: string[];
};
