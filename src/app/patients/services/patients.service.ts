import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';
import { environments } from 'src/environments/environments';
import { Gender } from '../interfaces/gender.interface';

@Injectable({providedIn: 'root'})
export class PatientsService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
   return this.http.get<Patient[]>(`${this.baseUrl}/pacients`)
  }

  getPatientById(id: string): Observable<Patient|undefined> {
    return this.http.get<Patient>(`${this.baseUrl}/pacients/${id}`)
      .pipe(
        catchError(error =>  of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/pacients/?q=${ query }&_limit=3`)

  }

  getPatientsGenders(): Observable<Gender[]> {

    return this.http.get<Gender[]>(`${this.baseUrl}/genders`)
  }

}
