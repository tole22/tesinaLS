import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportedPage } from 'src/app/models/reportedPages.model';


@Injectable({
  providedIn: 'root'
})
export class ReportedPagesService {
  URL_API = 'http://localhost:8080/api/reportedPages';

  reportedPages : ReportedPage[];

  constructor(private http: HttpClient) {}

    getReportedPages() {
      return this.http.get<ReportedPage[]>(this.URL_API);
    }

    getReportedPage(uri : string) {
      return this.http.post<ReportedPage>(this.URL_API+'/getReportedPage', {'baseURI' : uri});
    }

    // deleteStructure(_id : string) {
    //   return this.http.delete(`${this.URL_API}/${_id}`);
    // }

}
