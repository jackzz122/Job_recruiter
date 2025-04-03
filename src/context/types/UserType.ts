import { CompanyType } from "./CompanyType";

export const RoleName = {
  ADMIN: "admin",
  RECRUIT: "recruit",
  STAFF_RECRUIT: "staffRecruit",
  GUEST: "guest",
} as const;

export type UserRole = (typeof RoleName)[keyof typeof RoleName];

export interface UserType {
  id: string;
  email: string;
  fullname: string;
  avatarImg?: string;
  role: string;
  dob?: Date;
  address?: string;
  phone?: string;
  gender?: string;
  education?: string;
  skills?: string[];
  certificate?: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isActive: boolean;
  majorId?: string;
  companyId?: string | CompanyType; // Can be either string (ID) or populated CompanyType
  linkingProfile: string;
}
