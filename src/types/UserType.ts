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
  description: string;
};
export type workExType = {
  _id: string;
  jobTitle: string;
  company: string;
  responsibilites: string;
  startDate: string;
  endDate: string;
  description: string;
};
export type certificateType = {
  _id: string;
  name: string;
  organization: string;
  month: number;
  year: number;
  description: string;
};
export type projectType = {
  _id: string;
  projectName: string;
  link: string;
  description: string;
  startDate: string;
  endDate: string;
  role: string;
};
export type skillType = {
  _id: string;
  value: string;
};
export type uploadCVType = {
  _id: string;
  linkPdf: string;
  nameFile: string;
  uploadedAt: string;
};
export enum statusAccountType {
  PENDING = "pending",
  APPROVE = "approve",
  BLOCKED = "blocked",
  REJECTED = "rejected",
}
export interface UserType {
  _id: string;
  email: string;
  fullname: string;
  avatarImg?: string;
  role: string;
  dob?: string;
  aboutMe?: string;
  address?: string;
  avatarIMG?: string;
  phone?: string;
  gender?: string;
  uploadCV?: uploadCVType;
  coverLetter?: string;
  title?: string;
  statusAccount?: statusAccountType;
  education?: educationType[];
  skills?: skillType[];
  workEx?: workExType[];
  projects?: projectType[];
  certificate?: certificateType[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
  majorId?: string;
  companyId?: string | CompanyType;
  linkingProfile?: string;
  listFavouritesCompanyID?: string[] | CompanySaveResponse[];
  listFavouritesJobsID?: string[] | JobSaveResponse[];
}
export type ResponseUserType<T> = ResponseType<T>;

export type FavouriteCompany = {
  id: string[];
};
