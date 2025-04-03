export type pendingType = {
  _id: string;
  accountID: { _id: string; fullname: string; email: string };
  companyName: string;
  phoneNumber: string;
  email: string;
  status: string;
  address: string;
  websiteUrl: string;
  createdAt: Date;
};
