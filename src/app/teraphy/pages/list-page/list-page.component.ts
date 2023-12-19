import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { PatientsService } from '../../services/patients.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {

  public patients: Patient[] = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.getPatients()
      .subscribe(patients => this.patients = patients);

  }
}

