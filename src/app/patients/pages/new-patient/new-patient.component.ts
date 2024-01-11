import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Genders } from '../../interfaces/patient.interface';
import { Gender } from '../../interfaces/gender.interface';
import { DocumentTypes } from '../../interfaces/documentTypes.interface';
import { Relationships } from '../../interfaces/relationships.interface';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {
  public patientForm = new FormGroup({

    document_type_id: new FormControl<string>(''),
    identifier: new FormControl<string>(''),
    gender_id: new FormControl<Genders>(Genders.NullGender),
    name: new FormControl<string>('', { nonNullable: true }),
    lastname: new FormControl<string>(''),
    birthday: new FormControl<string>(''),
    mobile: new FormControl<string>(''),
    email: new FormControl<string>(''),
    address: new FormControl<string>(''),
    other_contact: new FormControl<string>(''),
    other_contact_mobile: new FormControl<string>(''),
    status: new FormControl<boolean>(true),
    relationship_id: new FormControl<string>(''),

  });

  public genders: Gender[] = [];
  public documentTypes: DocumentTypes[] = [];
  public relationships: Relationships[] = [];

  constructor(
    private patientsGendersService: PatientsService,
    private patientsDocumentTypes: PatientsService,
    private patientsRelatioships: PatientsService
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

  onSubmit(): void {
    console.log({
      formIsValid: this.patientForm.valid,
      value: this.patientForm.value,
    });
  }
}
