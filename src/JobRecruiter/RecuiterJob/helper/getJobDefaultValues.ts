import {
  JobFormData,
  JobResponse,
  JobTypeResponse,
} from "../../../types/JobType";
import { formatDateForDateInput } from "../../../utils/formatDateTimeLocal";
export const formDetail = {
  title: "",
  sizingPeople: 1,
  majorId: [{ value: "" }],
  minRange: 1,
  maxRange: 1,
  location: "",
  startDate: "",
  experience: 1,
  applicationDeadline: "",
  description: {
    summary: "",
    keySkills: {
      mainText: "",
      bulletPoints: [{ value: "" }],
    },
    whyYouLoveIt: {
      mainText: "",
      bulletPoints: [{ value: "" }],
    },
  },
};

export const getJobDefaultValues = (
  jobData?: JobTypeResponse<JobResponse>
): JobFormData => {
  if (!jobData) return formDetail;

  return {
    title: jobData.data.title || "",
    sizingPeople: jobData.data.sizingPeople || 1,
    majorId: jobData.data.majorId
      ? jobData.data.majorId.map((major) => ({
          value: typeof major === "string" ? major : major.value,
        }))
      : [{ value: "" }],
    minRange: jobData.data.minRange || 1,
    maxRange: jobData.data.maxRange || 1,
    location: jobData.data.location || "",
    startDate: formatDateForDateInput(jobData.data.startDate) || "",
    experience: jobData.data.experience || 1,
    applicationDeadline:
      formatDateForDateInput(jobData.data.applicationDeadline) || "",
    description: {
      summary: jobData.data.description?.summary || "",
      keySkills: {
        mainText: jobData.data.description?.keySkills?.mainText || "",
        bulletPoints: jobData.data.description?.keySkills?.bulletPoints
          ? jobData.data.description.keySkills.bulletPoints.map((point) => ({
              value: typeof point === "string" ? point : point.value,
            }))
          : [{ value: "" }],
      },
      whyYouLoveIt: {
        mainText: jobData.data.description?.whyYouLoveIt?.mainText || "",
        bulletPoints: jobData.data.description?.whyYouLoveIt?.bulletPoints
          ? jobData.data.description.whyYouLoveIt.bulletPoints.map((point) => ({
              value: typeof point === "string" ? point : point.value,
            }))
          : [{ value: "" }],
      },
    },
  };
};
