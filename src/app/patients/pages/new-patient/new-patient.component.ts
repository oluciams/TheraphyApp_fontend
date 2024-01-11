import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Genders, Patient } from '../../interfaces/patient.interface';
import { Gender } from '../../interfaces/gender.interface';
import { DocumentTypes } from '../../interfaces/documentTypes.interface';
import { Relationships } from '../../interfaces/relationships.interface';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {
  public patientForm = new FormGroup({

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
    private patientsService: PatientsService
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
