import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import axios, { AxiosError } from "axios";

interface ApiError {
  message: string;
  status?: number;
  type?: string;
}

export const handleError = (error: unknown): ApiError => {
  // Trường hợp lỗi từ RTK Query
  if ("status" in (error as FetchBaseQueryError)) {
    const rtkError = error as FetchBaseQueryError;

    // Trường hợp lỗi HTTP có status code
    if (typeof rtkError.status === "number") {
      // Lấy message từ response data nếu có
      let errorMessage = "Lỗi từ máy chủ";
      if (rtkError.data && typeof rtkError.data === "object") {
        if (
          "message" in rtkError.data &&
          typeof rtkError.data.message === "string"
        ) {
          errorMessage = rtkError.data.message;
        } else if (
          "error" in rtkError.data &&
          typeof rtkError.data.error === "string"
        ) {
          errorMessage = rtkError.data.error;
        }
      }

      return {
        message: errorMessage,
        status: rtkError.status,
        type: "api",
      };
    }

    // Trường hợp lỗi FETCH_ERROR (thường là lỗi mạng)
    if (rtkError.status === "FETCH_ERROR") {
      return {
        message:
          "Không thể kết nối đến máy chủ. Kiểm tra mạng hoặc thử lại sau.",
        type: "network",
      };
    }

    // Trường hợp lỗi TIMEOUT_ERROR
    if (rtkError.status === "TIMEOUT_ERROR") {
      return {
        message: "Kết nối tới máy chủ quá thời gian. Vui lòng thử lại sau.",
        type: "network",
      };
    }

    // Trường hợp lỗi PARSING_ERROR
    if (rtkError.status === "PARSING_ERROR") {
      return {
        message: "Có lỗi xử lý dữ liệu từ máy chủ.",
        type: "api",
      };
    }
  }

  // Trường hợp lỗi serialized từ RTK
  if (
    "name" in (error as SerializedError) &&
    "message" in (error as SerializedError)
  ) {
    const serializedError = error as SerializedError;
    return {
      message: serializedError.message || "Có lỗi xảy ra",
      type: "rtk",
    };
  }

  // Code xử lý axios error của bạn giữ nguyên cho trường hợp sử dụng axios trực tiếp
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      return {
        message: axiosError.response.data?.message || "Lỗi từ máy chủ",
        status: axiosError.response.status,
        type: "api",
      };
    }

    if (axiosError.request) {
      return {
        message:
          "Không thể kết nối đến máy chủ. Kiểm tra mạng hoặc thử lại sau.",
        type: "network",
      };
    }
  }

  // Lỗi không xác định
  return {
    message: "Có lỗi không xác định xảy ra. Vui lòng thử lại.",
    type: "unknown",
  };
};
