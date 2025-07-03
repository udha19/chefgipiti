import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  generateDoc(content: any, name: string) {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width; // height of the HTML content image
      const pageHeight = 297; // A4 height in mm
      const topPadding = 10;
      const bottomPadding = 10;
      const contentHeight = pageHeight - topPadding - bottomPadding;

      let heightLeft = imgHeight;
      let position = topPadding;
      let currentPage = 1;

      if (imgHeight > contentHeight) {
        // Additional pages
        while (heightLeft > 0) {
          pdf.addImage(
            imgData,
            'PNG',
            0, // x position
            position, // y position
            pdfWidth, // width
            imgHeight, // height: ensure last page fits correctly
            '',
            'FAST'
          );

          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pdfWidth, topPadding, 'F'); // padding top
          pdf.rect(0, pageHeight - bottomPadding, pdfWidth, bottomPadding, 'F'); // padding bottom

          currentPage++;
          position -= contentHeight; // Move the starting position down
          heightLeft -= contentHeight;

          if (heightLeft > 0) {
            pdf.addPage();
          }
        }
      } else {
        // Single page
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      pdf.save(name + '.pdf');
    });
  }
}
