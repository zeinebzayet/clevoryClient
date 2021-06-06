import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { examens, inscription } from './examens.component';

@Injectable({
  providedIn: 'root'
})
export class ExamensService {

  private baseUrl = "http://localhost:8090/api/examen";
  private baseUrlLast = "http://localhost:8090/api/lastExams";
  host :string = "http://localhost:8090";

 
  private baseUrlClient= "client/"+localStorage.getItem("cin");

  private baseUrlDemandeEx = "http://localhost:8090/api/inscriptionNb/client/"+localStorage.getItem("cin")+"/examen";

  constructor(private http: HttpClient) { }

  getAllExamens(): Observable<examens[]>{
    return this.http.get<examens[]>(`${this.baseUrl}`);
  }

  getLastExamens(): Observable<examens[]>{
    return this.http.get<examens[]>(`${this.baseUrlLast}`);
  }


}
           