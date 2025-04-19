import { ResponseType } from "./ResponseType";
import { UserType } from "./UserType";

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
};
export type CommentTypeResponse<T> = ResponseType<T>;
