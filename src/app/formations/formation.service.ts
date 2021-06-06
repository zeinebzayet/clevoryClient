import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from '../layout/formateur-layout/formateur-layout.component';
import { demande, Formations, salles } from './formations.component';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrlFormateur = "http://localhost:8090/api/formateurs";
  private baseUrlSalle = "http://localhost:8090/api/salles";
  private baseUrlFormation = "http://localhost:8090/api/formation";
 

  
  private baseUrlLast = "http://localhost:8090/api/lastFormation";

  private baseUrlLastFr = "http://localhost:8090/api/lastFormateurs";


  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<Formations[]>{
    return this.http.get<Formations[]>(`${this.baseUrlFormation}`) ;
  }
 
  getAllSalle(): Observable<salles[]>{
    return this.http.get<salles[]>(`${this.baseUrlSalle}`);
  }

  getAllFormateur(): Observable<Formateur[]>{
    return this.http.get<Formateur[]>(`${this.baseUrlFormateur}`);
  }

  getLastFormateur(): Observable<Formateur[]>{
    return this.http.get<Formateur[]>(`${this.baseUrlLastFr}`);
  }

  getLastFormation(): Observable<Formations[]>{
    return this.http.get<Formations[]>(`${this.baseUrlLast}`);
  }
 

}
