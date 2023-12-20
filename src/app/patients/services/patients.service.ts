import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class PatientsService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
   return this.http.get<Patient[]>(`${this.baseUrl}/pacients`)
  
  }

}
