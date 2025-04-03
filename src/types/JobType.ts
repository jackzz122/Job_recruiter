export type JobType = {
  title: string;
  sizingPeople: number;
  description: [];
  salaryRange: number;
};

interface DescriptionSection {
  mainText: string;
  bulletPoints: string[];
}

export interface JobDescription {
  keySkills: DescriptionSection;
  whyYouLoveIt: DescriptionSection;
}

export interface JobFormData {
  title: string;
  sizingPeople: number;
  majorId: string[];
  salaryRange: number;
  description: JobDescription;
  image?: File | null;
}

// For API responses
export interface JobResponse {
  _id: string;
  account_staff_id: string;
  title: string;
  sizingPeople: number;
  companyId: string;
  majorId: string[];
  salaryRange: number;
  description: JobDescription;
  listAccountId?: string[];
  createdAt: string;
}
