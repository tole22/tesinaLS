import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageStructure } from 'src/app/models/pageStructure.model';

@Injectable({
  providedIn: 'root'
})
export class PageStructureService {
  URL_API = 'http://localhost:8080/api/structures';

  pageStructures : PageStructure[];

  constructor(private http: HttpClient) {}

  getPageStructures() {
    return this.http.get<PageStructure[]>(this.URL_API);
  }

  getPageStructure(uri : string) {
    return this.http.post<PageStructure>(this.URL_API+'/getStructure', {'baseURI' : uri});
  }

  deleteStructure(_id : string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
