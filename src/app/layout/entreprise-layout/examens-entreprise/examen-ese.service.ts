import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { examens } from 'src/app/examens/examens.component';
import { demande } from '../formations-entreprise/formations-entreprise.component';
import { demandeE } from './examens-entreprise.component';

@Injectable({
  providedIn: 'root'
})
export class ExamenEseService {

  private baseUrl = "http://localhost:8090/api/examen";
  host :string = "http://localhost:8090";

  private baseUrlAdmin= "admin/"+localStorage.getItem("cin");

 
  private baseUrlClient= "client/"+80;

  constructor(private http: HttpClient) { }

  getAllExamens(): Observable<examens[]>{
    return this.http.get<examens[]>(`${this.baseUrl}`);
  }

  addDemande(idExamen:number,demandevoucher:demandeE):Observable<demandeE>{
    return this.http.post<demandeE>(`${this.baseUrl}/${idExamen}/${this.baseUrlAdmin}`,demandevoucher);
  }
}
