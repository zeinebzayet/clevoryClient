import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';import { demandeentreprise } from './client-ese.component';
;

@Injectable({
  providedIn: 'root'
})
export class NavclientService {

  private baseUrldemande = "http://localhost:8090/api/client/"+localStorage.getItem("cin");
  constructor(private httpClient:HttpClient) { }

  addDemandeentreprise(identreprise:number):Observable<demandeentreprise>{
    return this.httpClient.post<demandeentreprise>(`${this.baseUrldemande}/entreprise/${identreprise}`,{});
  }
}
