import { RefObject, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type PdfExportOptions = {
  filename?: string;
  scale?: number;
  format?: string | [number, number];
  orientation?: "portrait" | "p" | "landscape" | "l";
  padding?: number; // Padding tính bằng mm
  maxSizeMB?: number; // Maximum size in MB
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
        maxSizeMB = 5, // Maximum size 5MB
      }: PdfExportOptions = {}
    ) => {
      if (!elementRef.current) {
        console.error("Element reference is not available");
        return;
      }

      try {
        const element = elementRef.current;
        const originalHeight = element.offsetHeight;
        const originalWidth = element.offsetWidth;

        // Function to get image quality based on size
        const getImageQuality = (canvas: HTMLCanvasElement): number => {
          const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
          const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
          const base64Size = Math.ceil((dataUrl.length * 3) / 4);

          if (base64Size <= maxSizeBytes) return 1.0;

          // Calculate quality based on size ratio
          const quality = Math.sqrt(maxSizeBytes / base64Size);
          return Math.max(0.1, Math.min(1.0, quality));
        };

        // Initial canvas with high quality
        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          height: originalHeight,
          width: originalWidth,
        });

        // Get appropriate quality
        const quality = getImageQuality(canvas);

        // Create PDF
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: format,
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate dimensions
        const contentWidth = pageWidth - padding * 2;
        const contentHeight = (canvas.height * contentWidth) / canvas.width;

        // Adjust if content exceeds page height
        if (contentHeight > pageHeight - padding * 2) {
          const adjustedHeight = pageHeight - padding * 2;
          const adjustedWidth = (canvas.width * adjustedHeight) / canvas.height;
          const xPos = (pageWidth - adjustedWidth) / 2;

          pdf.addImage(
            canvas.toDataURL("image/jpeg", quality),
            "JPEG",
            xPos,
            padding,
            adjustedWidth,
            adjustedHeight
          );
        } else {
          const xPos = (pageWidth - contentWidth) / 2;
          pdf.addImage(
            canvas.toDataURL("image/jpeg", quality),
            "JPEG",
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
