import axios, { AxiosError } from "axios";
interface ApiError {
  message: string; // Thông báo lỗi cho người dùng
  status?: number; // HTTP status code (nếu có)
  type?: string; // Loại lỗi (network, api, unknown, etc.)
}
export const handleError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    // 1️⃣ ❌ Lỗi từ API (4xx, 5xx)
    if (axiosError.response) {
      return {
        message: axiosError.response.data?.message || "Lỗi từ máy chủ",
        status: axiosError.response.status,
        type: "api",
      };
    }

    // 2️⃣ 🌐 Lỗi mạng (mất kết nối, CORS, timeout, v.v.)
    if (axiosError.request) {
      return {
        message:
          "Không thể kết nối đến máy chủ. Kiểm tra mạng hoặc thử lại sau.",
        type: "network",
      };
    }
  }

  // 3️⃣ 💻 Lỗi không xác định (bug trong code, lỗi JS)
  return {
    message: "Có lỗi không xác định xảy ra. Vui lòng thử lại.",
    type: "unknown",
  };
};
