export const RoleName = {
  ADMIN: "admin",
  RECRUIT: "recruit",
  STAFF_RECRUIT: "staffRecruit",
  GUEST: "guest",
} as const;

export type UserRole = (typeof RoleName)[keyof typeof RoleName];
export interface UserType {
  id: string | number;
  email: string;
  fullname?: string;
  avatarImg?: string;
  role: UserRole;
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
  linkingProfile: string;
}
