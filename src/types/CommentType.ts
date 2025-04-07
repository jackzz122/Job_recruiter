import { UserType } from "./UserType";

export type CommentType = {
  _id: string;
  account_id: UserType;
  companyId: string;
  title: string;
  rating: number;
  details: [
    {
      whylove: string;
    },
    {
      suggest: string;
    }
  ];
  createdDate: string;
};
