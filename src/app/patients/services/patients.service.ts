import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';
import { environments } from 'src/environments/environments';
import { Gender } from '../interfaces/gender.interface';
import { DocumentTypes } from '../interfaces/documentTypes.interface';
import { Relationships } from '../interfaces/relationships.interface';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/pacients`);
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    return this.http
      .get<Patient>(`${this.baseUrl}/pacients/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.baseUrl}/pacients/?q=${query}&_limit=3`
    );
  }

  getPatientsGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.baseUrl}/genders`);
  }

  getPatientsDocumentTypes(): Observable<DocumentTypes[]> {
    return this.http.get<DocumentTypes[]>(`${this.baseUrl}/document_types`);
  }

  getPatientsRelationships(): Observable<Relationships[]> {
    return this.http.get<Relationships[]>(`${this.baseUrl}/relationships`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/pacients`, patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    if (!patient.id) throw Error('Patient id is required');
    return this.http.patch<Patient>(
      `${this.baseUrl}/pacients/${patient.id}`,
      patient
    );
  }

  //Si quiero reemplazar toda la data utilizo el metodo update
  // updatePatientPut(patient: Patient): Observable<Patient> {
  //   return this.http.put<Patient>(`${this.baseUrl}/pacients/${ patient.id }`, patient);
  // }

  deletePatientById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/pacients/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}

