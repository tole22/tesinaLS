import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageStructure } from 'src/app/models/pageStructure.model';
import { PageStructureService } from 'src/app/services/pageStructure.service';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.css']
})


export class PageStructureComponent implements OnInit {
  pageStructure : PageStructure;
  uri : string;
  loading : Boolean;
  hideVisitados : Boolean = true;
  hideInteractivos : Boolean = true;

  constructor(private route: ActivatedRoute, private pageStructureService : PageStructureService) { 
    this.uri = this.route.snapshot.paramMap.get('url');
    this.loading = true;
  }

  ngOnInit(): void {
  this.pageStructureService.getPageStructure(this.uri).subscribe(
    (res) => {
      this.pageStructure = res;
      this.loading = false; // TODO agregar spinner
      this.ordernarElementosVisitados();
    },
    (err) => console.log(err)
  );
  }

  ordernarElementosVisitados() {
    this.pageStructure.elementos_visitados = this.pageStructure.elementos_visitados.sort(function(a, b){
          return b.contador - a.contador;
     });
  }

  accesible(identificador : string) {
    // const arr = this.pageStructure.elementos_visitados.filter(elem => elem.identificador === identificador);
    // console.log(identificador+": cant: "+arr.length);
    // return arr.length > 0;
    return (this.pageStructure.elementos_visitados.filter(elem => elem.identificador === identificador).length > 0);
  }
}
