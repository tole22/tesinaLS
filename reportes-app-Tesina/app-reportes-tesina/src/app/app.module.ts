import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { PageStructureComponent } from './components/page-structure/page-structure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InaccessibleElementsComponent } from './components/inaccessible-elements/inaccessible-elements.component';
import { BadSmellReportComponent } from './components/bad-smell-report/bad-smell-report.component';
import { ModalComponent } from './common-components/modal/modal.component';
import { DefaultPipe } from './common-components/pipes/default.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportesComponent,
    PageNotFoundComponent,
    PageStructureComponent,
    InaccessibleElementsComponent,
    BadSmellReportComponent,
    ModalComponent,
    DefaultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
