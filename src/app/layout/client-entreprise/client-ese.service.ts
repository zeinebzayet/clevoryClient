import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { examens, inscription } from 'src/app/examens/examens.component';
import { demande } from 'src/app/formations/formations.component';
import { client_entreprise, Voucher } from '../entreprise-layout/employees/employees.component';
import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';
import { Notification } from '../entreprise-layout/formations-entreprise/formations-entreprise.component';

@Injectable({
  providedIn: 'root'
})
export class ClientEseService {
  private baseUrlNotification ="notify";
  host :string = "http://localhost:8090";
  public dataForm!:  FormGroup; 
  //private baseUrlPersonne ="http://localhost:8090/personne/"+9618888;
  //private baseUrlPersonneEse ="http://localhost:8090/personne/"+23298445;
  private baseUrlClient = "http://localhost:8090/api/clientP/"+localStorage.getItem("cin");

  private baseUrlNotif = "http://localhost:8090/notif/"+localStorage.getItem("cin");

  private baseUrlClientP = "http://localhost:8090/api/clientpassagers/"+localStorage.getItem("cin");
  private baseUrlVoucher = "http://localhost:8090/api/voucher/client/"+localStorage.getItem("cin");
  private baseUrlNotifs = "http://localhost:8090/notifs/"+localStorage.getItem("cin");
  private baseUrlNotifU = "http://localhost:8090/notific/"+localStorage.getItem("cin");

  private baseUrl = "http://localhost:8090/api/examen";
  private baseUrlClnt= "client/"+localStorage.getItem("cin");
  private baseUrlDemandeEx = "http://localhost:8090/api/inscriptionNb/client/"+localStorage.getItem("cin")+"/examen";
 
  private baseUrlFormation = "http://localhost:8090/api/formation";
  private baseUrlDemandeFx = "http://localhost:8090/api/demandesE/client/"+localStorage.getItem("cin")+"/formation";

  private baseUrlAdmin ="http://localhost:8090/admin/notify";

  private baseUrlAdminEse ="http://localhost:8090/adminentreprises/notify/"+localStorage.getItem("rcs");

  private baseUrlAdminEsee ="http://localhost:8090/adminentreprises/notify";
  
  private baseHeureDispo ="http://localhost:8090/api/examens";

  private baseClitExam ="http://localhost:8090/api/clients/"+localStorage.getItem("cin")+"/examens";
  constructor(private httpClient:HttpClient) { }
  
  connect() {
    let socket = new SockJs(`http://localhost:8090/ws`);

    let stompClient = Stomp.over(socket);

    return stompClient;
}

notifyAdmin():Observable<any>
{
  return this.httpClient.get("http://localhost:8090/notifyAdmin")
}


notifyAdminEse():Observable<any>
{
  return this.httpClient.get("http://localhost:8090/notifyAdminEse/"+localStorage.getItem("rcs")); 
}

addNotifEse(notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlAdminEse}`,notification);
}

/*addNotif(notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlPersonne}/${this.baseUrlNotification}`,notification);
}*/

addNotifEntreprise(rcs:number,notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlAdminEsee}/${rcs}`,notification);
}

NotifyAdminEses(rcs:number):Observable<any>
{
  return this.httpClient.get("http://localhost:8090/notifyAdminEse/"+rcs); 
}


addNotifAd(notification:Notification):Observable<Notification[]>
{
  return this.httpClient.post<Notification[]>(`${this.baseUrlAdmin}`,notification);
}

/*addNotifEse(notification:Notification):Observable<Notification>
{
  return this.httpClient.post<Notification>(`${this.baseUrlPersonneEse}/${this.baseUrlNotification}`,notification);
}*/

getNbNotif(): Observable<number> {
  return this.httpClient.get<number>(`${this.baseUrlNotifs}`);
}

updateNotif(): Observable<void>{
  return this.httpClient.get<void>(`${this.baseUrlNotifU}`);
}

getAllNotification(): Observable<Notification[]>{
  return this.httpClient.get<Notification[]>(`${this.baseUrlNotif}`);
}

getClient(): Observable<client_entreprise>{
  return this.httpClient.get<client_entreprise>(`${this.baseUrlClient}`) ;
}
createData(formData: FormData): Observable<any> {
  return this.httpClient.post(`${this.baseUrlClient}`, formData);
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

 updateClient(client: client_entreprise): Observable<client_entreprise> {
  return this.httpClient.put<client_entreprise>(`${this.baseUrlClientP}`, client);
}

getDemandes(): Observable<demande[]>{
  return this.httpClient.get<demande[]>(`${this.baseUrlClient}/demandes`) ;
}

getInscriptions(): Observable<inscription[]>{
  return this.httpClient.get<inscription[]>(`${this.baseUrlClient}/inscriptions`) ;
}

getVoucherformation(): Observable<Voucher[]>{
  return this.httpClient.get<Voucher[]>(`${this.baseUrlVoucher}/formation`) ;
}
getVoucherexamen(): Observable<Voucher[]>{
  return this.httpClient.get<Voucher[]>(`${this.baseUrlVoucher}/examen`) ;
}

addDemande(idExamen:number,inscrit:inscription):Observable<inscription>{
  return this.httpClient.post<inscription>(`${this.baseUrl}/${idExamen}/${this.baseUrlClnt}`,inscrit);
}

ExitInscription(id:number): Observable<number>{
  return this.httpClient.get<number>(`${this.baseUrlDemandeEx}/${id}`);
}

addDemandeFormation(idFormation:number):Observable<demande>{
  return this.httpClient.post<demande>(`${this.baseUrlFormation}/${idFormation}/${this.baseUrlClnt}`,{});
}

ExitDemande(id:number): Observable<number>{
  return this.httpClient.get<number>(`${this.baseUrlDemandeFx}/${id}`);
}

heureDispo(date :Date): Observable<[]>{
  return this.httpClient.get<[]>(`${this.baseHeureDispo}/dates/${date}`);
}

getAllInsc(exam :number): Observable<inscription[]>{
  return this.httpClient.get<inscription[]>(`${this.baseClitExam}/${exam}`);
}
}
