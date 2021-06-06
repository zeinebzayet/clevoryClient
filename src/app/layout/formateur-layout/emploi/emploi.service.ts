import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formations } from 'src/app/formations/formations.component';
import { Formation } from '../details-formation/details-formation.component';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  private baseUrlFormation = "http://localhost:8090/api/formateurs/"+localStorage.getItem("cin")+"/formation";

  private baseUrlFormationId = "http://localhost:8090/api/formations";

  host :string = "http://localhost:8090";
  constructor(private http: HttpClient) { }


  getformationByFormateur(): Observable<Formations[]>{
    return this.http.get<Formations[]>(`${this.baseUrlFormation}`) ;
  }
  
  getformationById(id:number): Observable<Formation>{
    return this.http.get<Formation>(`${this.baseUrlFormationId}/${id}`) ;
  }
}
