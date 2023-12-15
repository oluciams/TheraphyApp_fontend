import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';

// localhost:4200/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'new-patient', component: NewPatientComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: NewPatientComponent },
      { path: ':id', component: PatientPageComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeraphyRoutingModule {}
