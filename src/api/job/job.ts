import { JobType } from "../../context/types/JobType";
import axiosClient from "../axiosClient";

const jobApi = {
  createJob: async (data: JobType) => {
    const response = await axiosClient.post("/api/job/create", data);
    return response;
  },
  //   updateJob: async (id, data) => {},
  deleteJob: async (id: number) => {
    const response = await axiosClient.delete(`/api/job/${id}`);
    return response;
  },
};
export default jobApi;
