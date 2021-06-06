import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { demande } from 'src/app/formations/formations.component';
import { Formateur } from './formateur-layout.component';
import { Certification, Experience, Parcours } from './profil/profil.component';


@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  public dataForm!:  FormGroup; 
  host :string = "http://localhost:8090";


  private baseUrlImg="http://localhost:8090/api/Imgformateurs/"+localStorage.getItem("cin");
  private baseUrlFormateur = "http://localhost:8090/api/formateur/"+localStorage.getItem("cin");
  private baseUrlFormateurUp = "http://localhost:8090/api/formateurs/"+localStorage.getItem("cin");
  private baseUrlEtudiants="http://localhost:8090/api/listeEtudiants/formation";
  private baseUrlFormateurExperience = "http://localhost:8090/api/experience/formateur/"+localStorage.getItem("cin");

  private baseUrlFormateurParcours= "http://localhost:8090/api/parcours/formateur/"+localStorage.getItem("cin");

  private baseUrlUpdateExperience = "http://localhost:8090/api/formateur/"+localStorage.getItem("cin")+"/experience";
  private baseUrlUpdateParcours = "http://localhost:8090/api/formateur/"+localStorage.getItem("cin")+"/parcours";
  private baseUrlUpdateCertif = "http://localhost:8090/api/formateur/"+localStorage.getItem("cin")+"/certification";
  private baseUrlFormateurCertif= "http://localhost:8090/api/certification/formateur/"+localStorage.getItem("cin");

  constructor(private http: HttpClient) { }


  getFormateur(): Observable<Formateur>{
    return this.http.get<Formateur>(`${this.baseUrlFormateur}`) ;
  }

  getExperience(): Observable<Experience>{ 
    return this.http.get<Experience>(`${this.baseUrlFormateurExperience}`) ;
  }

  addExperience(exp:Experience): Observable<Experience>{
    return this.http.post<Experience>(`${this.baseUrlFormateurExperience}`,exp);
  }

  getParcours(): Observable<Parcours>{ 
    return this.http.get<Parcours>(`${this.baseUrlFormateurParcours}`) ;
  }

 
  addParcours(p:Parcours): Observable<Parcours>{
    return this.http.post<Parcours>(`${this.baseUrlFormateurParcours}`,p);
  }

  getListEtudiants(idFormation:number): Observable<demande []>{
    return this.http.get<demande []>(`${this.baseUrlEtudiants}/${idFormation}`) ;
  }

  updateFormateur(formateur: Formateur): Observable<Formateur> {
    return this.http.put<Formateur>(`${this.baseUrlFormateurUp}`, formateur);
  }

  updateExperience(id:number,experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.baseUrlUpdateExperience}/${id}`, experience);
  }

   updateParcours(id:number,p: Parcours): Observable<Parcours> {
    return this.http.put<Parcours>(`${this.baseUrlUpdateParcours}/${id}`, p);
  }
  
  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrlFormateur}`, formData);
  }
    uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
	
		return this.http.request(req);
   }
   
  getCertif(): Observable<Certification>{ 
    return this.http.get<Certification>(`${this.baseUrlFormateurCertif}`) ;
  }

  addCertif(p:Certification): Observable<Certification>{
    return this.http.post<Certification>(`${this.baseUrlFormateurCertif}`,p);
  }
  updateCertif(id:number,p: Certification): Observable<Certification> {
    return this.http.put<Certification>(`${this.baseUrlUpdateCertif}/${id}`, p);
  }

}
