import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';

import { PatientsService } from '../../services/patients.service';
import { Genders, Patient } from '../../interfaces/patient.interface';
import { Gender } from '../../interfaces/gender.interface';
import { DocumentTypes } from '../../interfaces/documentTypes.interface';
import { Relationships } from '../../interfaces/relationships.interface';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirm-dialog.component';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {
  public patientForm = new FormGroup({
    // id: new FormControl<string>('', { nonNullable: true }),
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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
      .pipe(switchMap(({ id }) => this.patientsService.getPatientById(id)))
      .subscribe((patient) => {
        if (!patient) return this.router.navigateByUrl('/');

        this.patientForm.reset(patient);
        return;
      });
  }

  get currentPatient(): Patient {
    const patient = this.patientForm.value as Patient;
    return patient;
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    if (this.currentPatient.id) {
      this.patientsService
        .updatePatient(this.currentPatient)
        .subscribe((patient) => {
          this.showSnackbar(`${patient.name} ${patient.lastname} updated!`);
        });

      return;
    }

    this.patientsService
      .addPatient(this.currentPatient)
      .subscribe((patient) => {
        this.router.navigate(['patients/list', patient.id]);
        this.showSnackbar(`${patient.name} ${patient.lastname} created!`);
      });
  }

  onDeletePatient() {
    if (!this.currentPatient.id) throw Error('Patient id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.patientForm.value,
    });

    //codigo refactorizado
    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.patientsService.deletePatientById(this.currentPatient.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this.router.navigate(['/patients']);
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) return;

    //   this.patientsService.deletePatientById(this.currentPatient.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted)
    //         this.router.navigate(['/patients']);
    //   })
    // });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
