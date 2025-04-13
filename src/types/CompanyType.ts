import { ResponseType } from "./ResponseType";

export type DescriptionCompanyType = {
  about: string;
  companySize: number;
  country: string;
  workingDays: number;
};

export type CompanyType = {
  _id: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  websiteUrl: string;
  createdAt: string;
  emailCompany: string;
  phoneNumberCompany: string;
  logo: string;
  years: number;
  overTime: boolean;
  keySkills: string[];
  description: DescriptionCompanyType[];
};
export type CompanyTypeResponse<T> = ResponseType<T>;
