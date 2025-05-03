import { RefObject, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type PdfExportOptions = {
  filename?: string;
  scale?: number;
  format?: string | [number, number];
  orientation?: "portrait" | "p" | "landscape" | "l";
  padding?: number; // Padding tính bằng mm
};

export const usePdfExport = () => {
  const exportToPdf = useCallback(
    async (
      elementRef: RefObject<HTMLElement>,
      {
        filename = "CVLayout.pdf",
        scale = 2,
        format = "a4",
        orientation = "portrait",
        padding = 5, // Padding mặc định 5mm
      }: PdfExportOptions = {}
    ) => {
      if (!elementRef.current) {
        console.error("Element reference is not available");
        return;
      }
      try {
        // Đảm bảo kích thước hiện tại được tính đúng
        const element = elementRef.current;
        const originalHeight = element.offsetHeight;
        const originalWidth = element.offsetWidth;

        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          // Đảm bảo chụp đầy đủ phần tử
          height: originalHeight,
          width: originalWidth,
        });

        // Khởi tạo PDF với định dạng được chọn
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: format,
        });

        // Tính toán kích thước và vị trí
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Tính toán kích thước hình ảnh phù hợp với trang, có xét đến padding
        const contentWidth = pageWidth - padding * 2;
        const contentHeight = (canvas.height * contentWidth) / canvas.width;

        // Kiểm tra nếu nội dung vượt quá trang
        if (contentHeight > pageHeight - padding * 2) {
          // Điều chỉnh kích thước để vừa với trang
          const adjustedHeight = pageHeight - padding * 2;
          const adjustedWidth = (canvas.width * adjustedHeight) / canvas.height;

          // Thêm hình ảnh vào giữa trang
          const xPos = (pageWidth - adjustedWidth) / 2;
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            xPos,
            padding,
            adjustedWidth,
            adjustedHeight
          );
        } else {
          // Thêm hình ảnh vào giữa trang
          const xPos = (pageWidth - contentWidth) / 2;
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            xPos,
            padding,
            contentWidth,
            contentHeight
          );
        }

        pdf.save(filename);
        return true;
      } catch (err) {
        console.error("Error generating PDF:", err);
        return false;
      }
    },
    []
  );
  return { exportToPdf };
};
