import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportedPage } from 'src/app/models/reportedPages.model';
import { ReportedPagesService } from 'src/app/services/reported-pages.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bad-smell-report',
  templateUrl: './bad-smell-report.component.html',
  styleUrls: ['./bad-smell-report.component.css']
})
export class BadSmellReportComponent implements OnInit {

  uri: string;
  loading: Boolean = true;
  reportedPage: ReportedPage;
  hideFormMessagesTable : Boolean = true;
  hideFloatElementsTable : Boolean = true;
  formMessagesElements = [];
  floatElements = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private reportedPagesService: ReportedPagesService
    ) {
    this.uri = this.route.snapshot.paramMap.get('url');
    this.checkUri(this.uri);
    this.loading = true;
   }

  ngOnInit(): void {
    this.reportedPagesService.getReportedPage(this.uri).subscribe(
      (res) => {
        this.reportedPage = res;
        this.loading = false; // TODO agregar spinner

        this.formMessagesElements = res.reported_elements.filter(function(elem) {
          return elem.bad_smell_type === 'FORM_MESSAGE';
        });

        this.floatElements = res.reported_elements.filter(function(elem) {
          return elem.bad_smell_type === 'FLOAT_ELEMENT';
        });
      },
      (err) => console.log(err)
    );
  }

  checkUri(uri: string) {
    if(uri === '') this.router.navigate(['/reportes']);
  }

  changeHideFormMessagesTable(element: any) {

    this.hideFormMessagesTable = !this.hideFormMessagesTable;
    if (!this.hideFormMessagesTable) {
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 0);
    }
  }
  changeHideFloatElementsTable(element: any) {

    this.hideFloatElementsTable = !this.hideFloatElementsTable;
    if (!this.hideFloatElementsTable) {
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 0);
    }
  }

  downloadPDF() {
    this.hideFloatElementsTable = false;
    this.hideFormMessagesTable = false;
    var element = document.getElementById('report');
    const { hostname } = new URL(this.uri);
    const pdfName = 'Reporte de accesibility smells para '+ hostname +'.pdf';

    setTimeout(() => {
      html2canvas(element).then((canvas) => {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF();
        
        var imgHeight = canvas.height * 208 / canvas.width;
  
        doc.addImage(imgData, 0, 0 ,208, imgHeight);
        doc.save(pdfName);
      });
    });
  }
}
