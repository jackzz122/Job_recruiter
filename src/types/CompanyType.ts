import { ResponseType } from "./ResponseType";

export type DescriptionCompanyType = {
  about: string;
  companySize: number;
  workingDays: number;
};

export type CompanyType = {
  _id: string;
  accountID: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  websiteUrl: string;
  createdAt: string;
  country: string;
  emailCompany: string;
  phoneNumberCompany: string;
  logo: string;
  years: number;
  status: string;
  overTime: boolean;
  keySkills: { value: string }[];
  description: DescriptionCompanyType[];
};
export type CompanyTypeResponse<T> = ResponseType<T>;
