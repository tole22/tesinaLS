import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageStructureComponent } from './components/page-structure/page-structure.component';
import { InaccessibleElementsComponent } from './components/inaccessible-elements/inaccessible-elements.component';
import { BadSmellReportComponent } from './components/bad-smell-report/bad-smell-report.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'inaccessible-elements', component: InaccessibleElementsComponent },
  { path: 'bad-smell-report/:url', component: BadSmellReportComponent },
  { path: 'estructura-pagina/:url', component: PageStructureComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
