import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportedPage } from 'src/app/models/reportedPages.model';
import { ReportedPagesService } from 'src/app/services/reported-pages.service';

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
  formMessagesElements = [];

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
      },
      (err) => console.log(err)
    );
  }

  checkUri(uri: string) {
    if(uri === '') this.router.navigate(['/reportes']);
  }

  changeHideFormMessagesTable(element: any) {
    this.hideFormMessagesTable = !this.hideFormMessagesTable;
    if(!this.hideFormMessagesTable) {
      setTimeout(() =>
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    }
  }

}
