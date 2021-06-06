import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminEntreprise } from '../formations-entreprise/formations-entreprise.component';

@Injectable({
  providedIn: 'root'
})
export class ProfilAdminService {



  host :string = "http://localhost:8090";


  public dataForm!:  FormGroup; 

  private baseUrlAdmin = "http://localhost:8090/api/admin/"+localStorage.getItem("cin");
  private baseUrlgetAdmin = "http://localhost:8090/api/admins/"+localStorage.getItem("cin");


  constructor(private httpClient:HttpClient) { }

  createData(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrlAdmin}`, formData);
  }
    uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
        reportProgress: true,
        responseType: 'text'
    });
  
    return this.httpClient.request(req);
   }

   getAdminByCin(): Observable<AdminEntreprise>{
    return this.httpClient.get<AdminEntreprise>(`${this.baseUrlgetAdmin}`) ;
  }


  updateAdmin(admin: AdminEntreprise): Observable<AdminEntreprise> {
    return this.httpClient.put<AdminEntreprise>(`${this.baseUrlAdmin}`, admin);
  }
 
}
