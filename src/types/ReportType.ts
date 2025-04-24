import { CommentType } from "./CommentType";
import { CompanyType } from "./CompanyType";
import { JobType } from "./JobType";
import { ResponseType } from "./ResponseType";

export enum targetType {
  JOB = "jobPosting",
  COMPANY = "companyInfo",
  COMMENT = "comment",
}
export enum statusTypeReport {
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type ReasonType = {
  reasonTitle: string;
  additionalReason: string;
};

export type ReportType = {
  _id: string;
  accountId: string;
  target_id: string;
  target_type: targetType;
  reportTarget: string;
  reason: ReasonType;
  status: statusTypeReport;
  createdAt: string;
};
export type ReportResponseType<T> = ResponseType<T>;

export type getReportItem = {
  _id: string;
  accountId: {
    _id: string;
    fullname: string;
    email: string;
    avatarIMG: string;
  };
  createdAt: string;
  reportTarget: CommentType | JobType | CompanyType;
  reason: { reasonTitle: string; additionalReason: string; email: string };
  target_id: { _id: string; email: string; fullname: string };
  target_type: targetType;
  status: string;
};
