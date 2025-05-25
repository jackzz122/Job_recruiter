import { ResponseType } from "./ResponseType";

export type pendingType = {
  _id: string;
  accountID: {
    _id: string;
    fullname: string;
    email: string;
    avatarIMG: string;
  };
  companyName: string;
  phoneNumber: string;
  email: string;
  status: string;
  address: string;
  websiteUrl: string;
  prevStatus?: string;
  createdAt: Date;
};
export type PendingTypeResponse<T> = ResponseType<T>;
