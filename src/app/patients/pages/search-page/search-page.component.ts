import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Patient } from '../../interfaces/patient.interface';
import { PatientsService } from '../../services/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public patients: Patient[] = [];
  public selectedPatient?: Patient;

  constructor(
    private patientsService: PatientsService,
    private router: Router
  ) {}

  searchPatient() {
    const value: string = this.searchInput.value || '';

    this.patientsService
      .getSuggestions(value)
      .subscribe((patients) => (this.patients = patients));
    console.log({ value });
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedPatient = undefined;
      return;
    }

    const patient: Patient = event.option.value;

    this.searchInput.setValue(patient.name);

    //this.patientsService.getPatientById(patient.id)

    this.selectedPatient = patient;
  }

  goPatient(): void {
    this.router.navigateByUrl('patients/list');
  }
}
