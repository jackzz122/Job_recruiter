import { ResponseType } from "./ResponseType";

export enum statusApplication {
  Submitted = "Submitted",
  Reviewing = "Reviewing",
  Rejected = "Rejected",
  Success = "Success",
}
export enum statusJob {
  OnGoing = "ongoing",
  Stop = "stop",
  Close = "close",
}
export enum statusCompany {
  APPROVED = "approve",
  PENDING = "pending",
  REJECTED = "blocked",
}
export type JobType = {
  _id: string;
  title: string;
  sizingPeople: number;
  description: [];
  salaryRange: number;
  status: statusJob;
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

export type listAccountType = {
  _id: string;
  accountId: string;
  linkPdf: string;
  appliedAt: string;
  coverLetter: string;
  status: statusApplication;
  notes: string;
};
export type candidateJobPostingType = {
  jobId: string;
  jobTitle: string;
  listAccount: {
    accountId: string;
    fullname: string;
    phone: string;
    avatarIMG: string;
    email: string;
    linkPdf: string;
    appliedAt: string;
    coverLetter: string;
    status: statusApplication;
    notes: string;
  }[];
};
// For API responses
export interface JobResponse {
  _id: string;
  accountId: string | { _id: string; fullname: string };
  title: string;
  sizingPeople: number;
  location: string;
  applicationDeadline: string;
  companyId:
    | string
    | { _id: string; companyName: string; logo: string; status: statusCompany };
  experience: number;
  startDate: string;
  majorId: { value: string }[];
  status: statusJob;
  minRange: number;
  maxRange: number;
  description: JobDescription;
  listAccount?: listAccountType[];
  createdAt: string;
}
export type JobTypeResponse<T> = ResponseType<T>;
