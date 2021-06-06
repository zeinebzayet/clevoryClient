import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { demande, Formateur, Formations, salles } from './formations-entreprise.component';


@Injectable({
  providedIn: 'root'
})
export class FormationEseService {

  private baseUrlFormateur = "http://localhost:8090/api/formateurs";
  private baseUrlSalle = "http://localhost:8090/api/salles";
  private baseUrlFormation = "http://localhost:8090/api/formation";
  private baseUrlAdmin= "admin/"+localStorage.getItem("cin");
 
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

  addDemande(idFormation:number,demandevoucher:demande):Observable<demande>{
    return this.http.post<demande>(`${this.baseUrlFormation}/${idFormation}/${this.baseUrlAdmin}`,demandevoucher);
  }
}
