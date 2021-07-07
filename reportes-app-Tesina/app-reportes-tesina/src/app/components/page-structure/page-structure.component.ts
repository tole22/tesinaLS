import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageStructure, ElemWithHandler } from 'src/app/models/pageStructure.model';
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
  hideWithHandler : Boolean = true;

  constructor(private route: ActivatedRoute, private pageStructureService : PageStructureService) { 
    this.uri = this.route.snapshot.paramMap.get('url');
    this.loading = true;
  }

  ngOnInit(): void {
    this.pageStructureService.getPageStructure(this.uri).subscribe(
      (res) => {
        console.log(res);
        this.pageStructure = res;
        this.initializeAccessibility();
        this.ordernarElementosVisitados();
        this.loading = false; // TODO agregar spinner
      },
      (err) => console.log(err)
    );
  }

  ordernarElementosVisitados() {
    this.pageStructure.elementos_visitados = this.pageStructure.elementos_visitados.sort(function(a, b){
          return b.contador - a.contador;
     });
  }

  initializeAccessibility() {
    this.pageStructure.elementos_con_handler.forEach( elem => {
      let datos = this.chequeoAccesibilidad(elem);
      elem.isAccesible = datos.accesible;
      elem.message = datos.mensaje;
    }
      );
  }

  accesible(identificador : string) {
    return (this.pageStructure.elementos_visitados.filter(elem => elem.identificador === identificador).length > 0);
  }

  chequeoAccesibilidad(elemento: ElemWithHandler) {
    // aca voy armando por ejemplo si el elemento es un link y no tiene href puede ser problematico
    let msg, mensaje;
    let accesible = true;

    // <a> elementos links
    if (elemento.tagName === 'A') {
      if (elemento.href === '') {
        msg = 'El elemento es un link sin HREF por lo tanto puede ser inaccesible';
        accesible = false;
      } else {
        msg = 'El elemento es un link con HREF por lo tanto deberia ser accesible';
      }
    // <div> elementos div
    } else if (elemento.tagName === 'DIV') {
      if (this.tieneHijos(elemento.children)) {
        msg = 'este div tiene hijos';
      } else {
        msg = 'este div NO tiene hijos';
      }
    // Por defecto son accesibles  
    } else {
      msg = 'Accesible';
    }

    if (accesible) {
      mensaje = `<span>Accesible: ` + msg + `</span>`;
    } else {
      mensaje = `<span>` + msg + `</span>`;
    }

    return {
      'accesible': accesible,
      'mensaje': mensaje
    };
  }

  // chequeo si el elemento tiene hijos, 
  // si no tiene, return false
  // si tiene un solo hijo y es "text", return false
  tieneHijos(childs) {
    let tiene = false;
    if (childs.length > 0) {
      childs.forEach(child => {
        if (child.tagName != 'text') {
          tiene = true;
          return true;
        }
      });
      return tiene;
    } else {
      return false;
    }
  }
}
