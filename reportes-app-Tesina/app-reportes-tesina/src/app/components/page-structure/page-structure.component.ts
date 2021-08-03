import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageStructure, ElemWithHandler } from 'src/app/models/pageStructure.model';
import { PageStructureService } from 'src/app/services/pageStructure.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
    let msg = '', mensaje;
    let accesible = false;

    // <a> elementos links
    if (elemento.tagName === 'A') {
      if (elemento.href === '') {
        msg = '- El elemento es un link sin HREF por lo tanto puede ser inaccesible<br>';
        accesible = false;
      } else {
        msg = '- El elemento es un link con HREF por lo tanto deberia ser accesible<br>';
        accesible = true;
      }
    // <div> elementos div
    } else if (elemento.tagName === 'DIV') {
      accesible = false;
      const elemHijos = this.tieneHijos(elemento.children);
      if (elemHijos.tieneHijos) {
        msg = '- Este elemento div tiene hijos<br>';
        if (elemHijos.hijosAccesibles) {
          msg = msg + '- Sus hijos poseen atributos para accesibilidad<br>';
          accesible = true;
        } else {
          msg = msg + '- Sus hijos NO poseen atributos para accesibilidad<br>';
        }
      } else {
        msg = msg + '- Este elemento div NO tiene hijos<br>';
      }
      if (this.poseeAtributosAccesibilidad(elemento)) {
        msg = msg + '- Este elemento posee atributos de accesibilidad<br>';
        accesible = true;
      } else {
        msg = msg + '- Este elemento NO posee atributos de accesibilidad<br>';
      }
    // Elementos generales: LI, SPAN  
    } else {
      accesible = false;
      const elemChild = this.tieneHijos(elemento.children);
      if (this.poseeAtributosAccesibilidad(elemento)) {
        msg = '- Este elemento posee atributos de accesibilidad<br>';
        accesible = true;
      } else {
        msg = msg + '- Este elemento NO posee atributos de accesibilidad<br>';
      }
      if (elemChild.tieneHijos) {
        msg = msg + '- Este elemento tiene hijos<br>';
        if (elemChild.hijosAccesibles) {
          msg = msg + '- Sus hijos poseen atributos para accesibilidad<br>';
          accesible = true;
        } else {
          msg = msg + '- Sus hijos NO poseen atributos para accesibilidad<br>';
        }
      } else {
        msg = msg + '- Este elemento div NO tiene hijos<br>';
      }
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
    let hijosAccesibles = false;
    if (childs.length > 0) {
      childs.forEach(child => {
        if (child.tagName != 'text') {
          tiene = true;
          // es accesible si es un <a> con href
          if (child.tagName === 'A' && child.href !== '') {
            hijosAccesibles = true;
          }
          // tiene algun atributo de accesibilidad
          if (child.tabindex !== '' || child.aria_label !== '' || child.role !== '') {
            hijosAccesibles = true;
          }
          return true;
        }
      });
      return {
        'tieneHijos' : tiene,
        'hijosAccesibles' : hijosAccesibles
      };
    } else {
      return {
        'tieneHijos' : false,
        'hijosAccesibles' : false
      };
    }
  }

  poseeAtributosAccesibilidad(elem) {
    const atrib = elem.accessibility_attrib;
    if (atrib.tabindex !== '' || atrib.aria_label !== '' || atrib.role !== '') {
        return true;
    } else {
      return false;
    }
  }


  downloadPDF() {
    this.hideVisitados = false;
    this.hideInteractivos = false;
    this.hideWithHandler = false;
    var element = document.getElementById('report');
    const { hostname } = new URL(this.uri);
    const pdfName = 'Reporte de accesibilidad en elementos interactivos para '+ hostname +'.pdf';

    element.style.paddingTop = "50px";

     setTimeout(() => {
      html2canvas(element).then((canvas) => {
       
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
       
            //One page pdf shows the height of the canvas generated by the html page;
            var pageHeight = contentWidth / 592.28 * 841.89;
            // html page height is not generated pdf
            var leftHeight = contentHeight;
            //page offset
            var position = 0;
            //a4 paper size [595.28, 841.89], html page generated canvas in pdf image width and height
            var imgWidth = 555.28;
            
            var imgHeight = 555.28/contentWidth * contentHeight;
       
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
       
            var pdf = new jsPDF('p', 'pt', 'a4');
       
            // There are two heights to distinguish, one is the actual height of the html page, and the height of the page that generated the pdf (841.89)
            //When the content does not exceed the range displayed on the pdf page, no paging is required.
            if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );
            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    // Avoid adding blank pages
                    if(leftHeight > 0) {
                      pdf.addPage();
                    }
                }
            }
       
            pdf.save(pdfName);
        });
    }, 500);
  }
}
