import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
})
export class PatientPageComponent implements OnInit{

  public patient?: Patient;

  //injectar el servicio
  constructor(
    private patientsService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.patientsService.getPatientById(id)),

      ).subscribe(patient => {

        if (!patient) return this.router.navigate(['/patients/list']);

        this.patient = patient;
        return;

      })

  }

}
