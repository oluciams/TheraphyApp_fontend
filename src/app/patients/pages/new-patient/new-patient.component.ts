import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientsService } from '../../services/patients.service';
import { Genders, Patient } from '../../interfaces/patient.interface';
import { Gender } from '../../interfaces/gender.interface';
import { DocumentTypes } from '../../interfaces/documentTypes.interface';
import { Relationships } from '../../interfaces/relationships.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {
  public patientForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', { nonNullable: true }),
    lastname: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
    identifier: new FormControl<string>(''),
    document_type_id: new FormControl<string>(''),
    mobile: new FormControl<string>(''),
    email: new FormControl<string>(''),
    address: new FormControl<string>(''),
    other_contact: new FormControl<string>(''),
    other_contact_mobile: new FormControl<string>(''),
    relationship_id: new FormControl<string>(''),
    status: new FormControl<boolean>(true),
    gender_id: new FormControl<Genders>(Genders.NullGender),

  });

  public genders: Gender[] = [];
  public documentTypes: DocumentTypes[] = [];
  public relationships: Relationships[] = [];

  constructor(
    private patientsGendersService: PatientsService,
    private patientsDocumentTypes: PatientsService,
    private patientsRelatioships: PatientsService,
    private patientsService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.patientsGendersService
      .getPatientsGenders()
      .subscribe((genders) => (this.genders = genders));

    this.patientsDocumentTypes
      .getPatientsDocumentTypes()
      .subscribe((documentTypes) => (this.documentTypes = documentTypes));

    this.patientsRelatioships
      .getPatientsRelationships()
      .subscribe((relationships) => (this.relationships = relationships));

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.patientsService.getPatientById(id)),
    ).subscribe(patient => {

        if (!patient) return this.router.navigateByUrl('/');

        this.patientForm.reset(patient);
        return;
    })
  }

  get currentPatient(): Patient {

    const patient = this.patientForm.value as Patient;
    return patient;
  }

  onSubmit(): void {

    if (this.patientForm.invalid) return;

    if (this.currentPatient.id) {
      this.patientsService.updatePatient(this.currentPatient)
        .subscribe(patient => {
          //TODO: mostrar mensaje
        });

      return;
    }
    
    this.patientsService.addPatient(this.currentPatient)
      .subscribe(patient => {
        //TODO: mostrar mensaje y navegar al paciente id
      })
  }
}
