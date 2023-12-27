import { Component, OnInit } from '@angular/core';
import { Gender } from '../../interfaces/gender.interface';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {

  public genders: Gender[] = [];

  constructor(private patientsGendersService: PatientsService) {}

  ngOnInit(): void {

    this.patientsGendersService.getPatientsGenders()
      .subscribe(genders => this.genders = genders)

  }


}
