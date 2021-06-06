import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { demandeentreprise } from 'src/app/navbare/client-ese/client-ese.component';
import { AssignerVoucher, client_entreprise, Voucher } from './employees/employees.component';
import { AdminEntreprise, Entreprise, Notification } from './formations-entreprise/formations-entreprise.component';
import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class AdminEseService {

  private baseUrlNotification ="notify";
  host :string = "http://localhost:8090";
  public dataForm!:  FormGroup; 
  private baseUrlPersonne ="http://localhost:8090/personne/"+9618888;
  private baseUrlNotif = "http://localhost:8090/notif/"+localStorage.getItem("cin");
  private baseUrlClient = "http://localhost:8090/api/entreprises/"+localStorage.getItem("rcs");

  private baseUrlClientP = "http://localhost:8090/api/clientsentreprise";
  private baseUrlAdmin = "http://localhost:8090/api/admin/"+localStorage.getItem("cin");
  private baseUrlAddVoucher="http://localhost:8090/api/voucher";
  private baseUrlEntreprise="http://localhost:8090/api/entreprises";

  private baseUrlDemande="http://localhost:8090/api/demande/entreprise/"+localStorage.getItem("rcs");
  private baseUrlAccepteDemande="http://localhost:8090/api/accept/entreprise/"+localStorage.getItem("rcs");
  private baseUrlNotifs = "http://localhost:8090/notifs/"+localStorage.getItem("cin");
  private baseUrlNotifU = "http://localhost:8090/notific/"+localStorage.getItem("cin");

  private baseUrlUser ="http://localhost:8090/personne";

  private baseUrlEmail = "http://localhost:8090/api/sendEmailClient";

  private baseUrVE= "http://localhost:8090/api/voucher/examen/entreprise/"+localStorage.getItem("rcs");

  private baseUrVF= "http://localhost:8090/api/voucher/formation/entreprise/"+localStorage.getItem("rcs");

  private baseUrlNbE= "http://localhost:8090/api/voucher";

  private baseUrlEmp= "http://localhost:8090/api/entreprises/"+localStorage.getItem("rcs")+"/vouchers";
  constructor(private httpClient:HttpClient) { }

  connect() {
    let socket = new SockJs(`http://localhost:8090/ws`);

    let stompClient = Stomp.over(socket);

    return stompClient;
}
notifyAdmin():Observable<any>
{
  return this.httpClient.get("http://localhost:8090/notifyAdmin/"+9618888)
}

addNotif(notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlPersonne}/${this.baseUrlNotification}`,notification);
}

getNbNotif(): Observable<number> {
  return this.httpClient.get<number>(`${this.baseUrlNotifs}`);
}

updateNotif(): Observable<void>{
  return this.httpClient.get<void>(`${this.baseUrlNotifU}`);
}

getAllNotification(): Observable<Notification[]>{
  return this.httpClient.get<Notification[]>(`${this.baseUrlNotif}`);
}
notifyUser(id:number):Observable<any>
{
  return this.httpClient.get("http://localhost:8090/notifyUser/"+id)
}

addNotifUser(idpersonne:number,notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlUser}/${idpersonne}/notify`,notification);
}

  getAdmin(): Observable<AdminEntreprise >{
    return this.httpClient.get<AdminEntreprise>(`${this.baseUrlAdmin}`) ;
  }

  sendEmail(client: client_entreprise): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlEmail}`,client);
  }

  getAllClient(): Observable<client_entreprise []>{
    return this.httpClient.get<client_entreprise[]>(`${this.baseUrlClient}/clientsentreprise`) ;
  }

  getEmployesNonAssigne(code:string): Observable<client_entreprise[]>{
    return this.httpClient.get<client_entreprise[]>(`${this.baseUrlEmp}/${code}/employes`) ;
  }

  getVoucher(): Observable<Voucher[]>{
    return this.httpClient.get<Voucher[]>(`${this.baseUrVF}`) ;
  }
  getVoucherExamen(): Observable<Voucher[]>{
    return this.httpClient.get<Voucher[]>(`${this.baseUrVE}`) ;
  }
  /*getVoucherFormation(): Observable<Voucher[]>{
    return this.httpClient.get<Voucher[]>(`${this.baseUrlClient}/vouchers/formation`) ;
  }*/

  addVoucherFormation(idvoucher:number,cin:number,v:AssignerVoucher): Observable<AssignerVoucher>{
    return this.httpClient.post<AssignerVoucher>(`${this.baseUrlAddVoucher}/${idvoucher}/client/${cin}`,v );
  }
  getList(code:string): Observable<client_entreprise[]>{
    return this.httpClient.get<client_entreprise[]>(`${this.baseUrlAddVoucher}/${code}/list`) ;
  }


  updateClient(cin:number,client: client_entreprise): Observable<client_entreprise> {
    return this.httpClient.put<client_entreprise>(`${this.baseUrlClientP}/${cin}`, client);
  }

  addClient(client: client_entreprise): Observable<client_entreprise>{
    return this.httpClient.post<client_entreprise>(`${this.baseUrlClient}/clientsentreprise`,client);
  }

  deleteClient(id: number): Observable<client_entreprise[]>{
    return this.httpClient.delete<client_entreprise[]>(`${this.baseUrlClientP}/${id}`);
  }

   getAllClientArchive(): Observable<client_entreprise []>{
    return this.httpClient.get<client_entreprise[]>(`${this.baseUrlClient}/clientsentreprise/archive`) ;
  }

  
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


   updateAdmin(admin: AdminEntreprise): Observable<AdminEntreprise> {
    return this.httpClient.put<AdminEntreprise>(`${this.baseUrlAdmin}`, admin);
  }

  addClientTest(client: client_entreprise): Observable<client_entreprise>{
    return this.httpClient.post<client_entreprise>(`${this.baseUrlClientP}`,client);
  }

  getAllEntreprise(): Observable<Entreprise []>{
    return this.httpClient.get<Entreprise[]>(`${this.baseUrlEntreprise}`) ;
  }


  getDemandeEnAttente(): Observable<demandeentreprise[]>{
    return this.httpClient.get<demandeentreprise[]>(`${this.baseUrlDemande}`) ;
  }

  accepteDemande(cin:number,id:number,d:demandeentreprise): Observable<demandeentreprise[]> {
    return this.httpClient.put<demandeentreprise[]>(`${this.baseUrlAccepteDemande}/clientsentreprise/${cin}/demande/${id}`, d);
  }


  addVoucherToClient(idvoucher:string,cin:any): Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrlAddVoucher}/${idvoucher}?cin=${cin}`,cin );
  }

  getNbemplyesByVoucher(code:string): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrlNbE}/${code}/nbEmployes`) ;
  }


  
}