import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { personne } from '../navbare/index/index.component';


const AUTH_API = 'http://localhost:8090/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }

  login(pers: personne): Observable<any> {
    console.log(pers.username);
    console.log(pers.password);
    

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(pers.username + ':' + pers.password) });
    return this.http.get<any>(AUTH_API + 'login', { headers });
  }


  register(cin: number, username: string, prenom: string, email: string, password: string, adresse: string, tel: number, niveau: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      cin,
      username,
      prenom,
      email,
      password,
      adresse,
      tel,
      niveau,
      role
    }, httpOptions);
  }


  register1(rcs: number, nom: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      rcs,
      nom,
      email,
      password,
      role
    }, httpOptions);
  }

  register2(cin: number, username: string, prenom: string, email: string, password: string, adresse: string, tel: number, typeformateur: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      cin,
      username,
      prenom,
      email,
      password,
      adresse,
      tel,
      typeformateur,
      role
    }, httpOptions);
  }

 

}
