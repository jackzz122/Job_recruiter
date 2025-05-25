import { ResponseType } from "./ResponseType";

export type MajorType = {
  _id: string;
  name: string;
};
export type MajorTypeResponse<T> = ResponseType<T>;
