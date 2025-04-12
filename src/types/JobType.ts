import { ResponseType } from "./ResponseType";

export type JobType = {
  title: string;
  sizingPeople: number;
  description: [];
  salaryRange: number;
};

interface DescriptionSection {
  mainText: string;
  bulletPoints: { value: string }[];
}

export interface JobDescription {
  summary: string;
  keySkills: DescriptionSection;
  whyYouLoveIt: DescriptionSection;
}

export interface JobFormData {
  title: string;
  sizingPeople: number;
  majorId: { value: string }[];
  minRange: number;
  maxRange: number;
  description: JobDescription;
  image?: File | null;
  location: string;
  experience: number;
  startDate: string;
  applicationDeadline: string;
}

// For API responses
export interface JobResponse {
  _id: string;
  accountId: string;
  title: string;
  sizingPeople: number;
  location: string;
  applicationDeadline: string;
  companyId: string;
  experience: number;
  startDate: string;
  majorId: { value: string }[];
  status: string;
  minRange: number;
  maxRange: number;
  description: JobDescription[];
  listAccountId?: string[];
  createdAt: string;
}
export type JobTypeResponse<T> = ResponseType<T>;
