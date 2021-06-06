import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as SockJs from 'sockjs-client';
import { inscription } from 'src/app/examens/examens.component';
import { ClientPassager, demande } from 'src/app/formations/formations.component';
import * as Stomp from 'stompjs';
import { Notification } from '../entreprise-layout/formations-entreprise/formations-entreprise.component';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrlNotification ="notify";
  host :string = "http://localhost:8090";


  private baseUrlPersonne ="http://localhost:8090/personne/"+9618888;

  public dataForm!:  FormGroup; 

  private baseUrlClient = "http://localhost:8090/api/clientP/"+localStorage.getItem("cin");

  private baseUrlClientP = "http://localhost:8090/api/clientpassagers/"+localStorage.getItem("cin");
  private baseUrlNotif = "http://localhost:8090/notif/"+localStorage.getItem("cin");

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

getAllNotification(): Observable<Notification[]>{
  return this.httpClient.get<Notification[]>(`${this.baseUrlNotif}`);
}

getClient(): Observable<ClientPassager>{
  return this.httpClient.get<ClientPassager>(`${this.baseUrlClient}`) ;
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

 updateClient(client: ClientPassager): Observable<ClientPassager> {
  return this.httpClient.put<ClientPassager>(`${this.baseUrlClientP}`, client);
}

getDemandes(): Observable<demande[]>{
  return this.httpClient.get<demande[]>(`${this.baseUrlClient}/demandes`) ;
}

getInscriptions(): Observable<inscription[]>{
  return this.httpClient.get<inscription[]>(`${this.baseUrlClient}/inscriptions`) ;
}





}
