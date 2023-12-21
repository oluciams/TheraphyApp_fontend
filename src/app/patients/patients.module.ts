import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPatientComponent,
    PatientPageComponent,
    SearchPageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
