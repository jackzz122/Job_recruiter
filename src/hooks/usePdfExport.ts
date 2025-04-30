import { RefObject, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
/**
 * Xuất element thành PDF và tải về
 * @param {React.RefObject} elementRef - Ref đến element cần xuất
 * @param {Object} options - Các tùy chọn
 * @param {string} options.filename - Tên file PDF (mặc định: 'document.pdf')
 * @param {number} options.scale - Tỷ lệ khi chụp (mặc định: 2)
 * @param {string} options.format - Định dạng trang (mặc định: 'a4')
 * @param {string} options.orientation - Hướng trang (mặc định: 'portrait')
 * @returns {Promise<void>}
 */

type PdfExportOptions = {
  filename?: string;
  scale?: number;
  format?: string | [number, number];
  orientation?: "portrait" | "p" | "landscape" | "l";
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
      }: PdfExportOptions = {}
    ) => {
      if (!elementRef.current) {
        console.error("Element reference is not valiable");
        return;
      }
      try {
        const canvas = await html2canvas(elementRef.current, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
        });
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: format,
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = 0;
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );
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
