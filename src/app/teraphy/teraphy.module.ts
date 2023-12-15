import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { TeraphyRoutingModule } from './teraphy-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPatientComponent,
    PatientPageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TeraphyRoutingModule
  ]
})
export class TeraphyModule { }
