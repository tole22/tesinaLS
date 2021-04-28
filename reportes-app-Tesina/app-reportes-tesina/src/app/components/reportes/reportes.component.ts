import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PageStructure } from 'src/app/models/pageStructure.model';
import { PageStructureService } from 'src/app/services/pageStructure.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  pageStructures : PageStructure[];

  pageStructures$: Observable<PageStructure[]>;
  filter = new FormControl('');

  constructor(public pageStructureService: PageStructureService,
              public pipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.getPageStructures();
  }

  getPageStructures() {
    this.pageStructureService.getPageStructures().subscribe(
      (res) => {
        this.pageStructureService.pageStructures = res;
        this.pageStructures = res;

        this.pageStructures$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe))
        );
      },
      (err) => console.log(err)
    );
  }

  deleteStructure(id: string) {
    if (confirm('Seguro de eliminar la estructura?')) {
      this.pageStructureService.deleteStructure(id).subscribe(
        (res) => {
          this.getPageStructures();
        },
        (err) => console.log(err)
      );
    }
  }

  deleteStructureEvents(url: string) {
    if (confirm('Seguro de eliminar todos los eventos?')) {
      this.pageStructureService.deleteStructureEvents(url).subscribe(
        (res) => {
          this.getPageStructures();
        },
        (err) => console.log(err)
      );
    }
  }

  search(text: string, pipe: PipeTransform): PageStructure[] {
    return this.pageStructures.filter(structure => {
      const term = text.toLowerCase();
      return structure.baseURI.toLowerCase().includes(term);
    });
  }

}
