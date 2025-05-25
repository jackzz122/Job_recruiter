import { ResponseType } from "./ResponseType";
import { UserType } from "./UserType";
export enum CommentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type CommentType = {
  _id: string;
  account_id: UserType;
  company_id: string;
  title: string;
  rating: number;
  details: {
    whyLove: string;
    suggest: string;
  };
  createdDate: string;
  status: CommentStatus;
};
export type CommentTypeResponse<T> = ResponseType<T>;
