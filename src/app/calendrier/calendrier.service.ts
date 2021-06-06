import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur, Formations, salles } from '../formations/formations.component';




@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  private baseUrlFormateur = "http://localhost:8090/api/formateurs";
  private baseUrlSalle = "http://localhost:8090/api/salles";
  private baseUrlFormation = "http://localhost:8090/api/formation";

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

  addFormation(idSalle:number,idFormateur:number,formation:Formations):Observable<Formations>{
    return this.http.post<Formations>(`${this.baseUrlSalle}/${idSalle}/formateurs/${idFormateur}/formation`,formation);
  }

  updateFormation(idFormation:number,formation:Formations): Observable<Formations>{
    return this.http.put<Formations>(`${this.baseUrlFormation}/${idFormation}`,formation);
  }

  deleteFormation(idFormation:number): Observable<Formations[]>{
    return this.http.delete<Formations[]>(`${this.baseUrlFormation}/${idFormation}`);
  }

}
