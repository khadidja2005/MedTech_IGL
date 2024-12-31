import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8000/consultations/';

  constructor(private http: HttpClient) {}

  getConsultationDetails(consultationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${consultationId}/`);
  }

  modifyConsultation(consultationId: string, medecin: string, date: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${consultationId}/modify/`, { medecin, date });
  }

  deleteConsultation(consultationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${consultationId}/delete/`);
  }

  getOrdonnances(consultationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${consultationId}/ordonnances/`);
  }

  addOrdonnance(consultationId: string, ordonnance: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${consultationId}/ordonnances/`, ordonnance);
  }

  getBilans(consultationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${consultationId}/bilans/`);
  }

  addBilan(consultationId: string, bilan: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${consultationId}/bilans/`, bilan);
  }
}
