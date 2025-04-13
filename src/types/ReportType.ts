import { ResponseType } from "./ResponseType";

export enum targetType {
  JOB = "job",
  COMPANY = "company",
  CANDIDATE = "comment",
}
export enum statusTypeReport {
  PENDING = "pending",
  REVOLVED = "revolved",
  RESOLVE = "resolve",
}

export type ReasonType = {
  reason: string;
  additional: string;
};

export type ReportType = {
  _id: string;
  accountId: string;
  targetId: targetType;
  reason: ReasonType[];
  status: statusTypeReport;
};
export type ReportResponseType<T> = ResponseType<T>;
