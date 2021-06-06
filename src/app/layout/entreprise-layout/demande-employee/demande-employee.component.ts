import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { demandeentreprise } from 'src/app/navbare/client-ese/client-ese.component';
import { AdminEseService } from '../admin-ese.service';
import { Notification } from '../formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-demande-employee',
  templateUrl: './demande-employee.component.html',
  styleUrls: ['./demande-employee.component.css']
})
export class DemandeEmployeeComponent implements OnInit {

  
  demande!:demandeentreprise[];
  d!:demandeentreprise;
  public message!:string;
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(public serviceAdmin:AdminEseService,private router: Router) { }

  ngOnInit(): void {
    this.serviceAdmin.getDemandeEnAttente().subscribe(
      (response: demandeentreprise[]) => { 
        console.log(response);
        this.demande=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(demande: demandeentreprise, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.d= demande;
      button.setAttribute('data-target', '#demandeModal');
    }
    container.appendChild(button);
    button.click(); 
  }

  public searchDemandeEmployee(key: string): void {
    console.log(key);
    const results: demandeentreprise[] = [];
    for (const d of this.demande) {
      if (d.client.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      d.client.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      d.client.username.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      d.client.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      d.client.tel.toString().indexOf(key.toLowerCase()) !== -1 ||
      d.client.niveau.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(d);
      }
    }
    this.demande = results;
    if (results.length === 0 || !key) {
      this.ngOnInit();
    }
  }

  public accepteDemande(cin:number,id:number,d:demandeentreprise) {
    this.serviceAdmin.accepteDemande(cin,id,d).subscribe(
      (response: demandeentreprise[]) => {
        this.ngOnInit();
        this.serviceAdmin.sendEmail(d.client).subscribe
        (
          (response: any) => {
          
          })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  
  
    );
  }
  notifyUser(id:number)
  {
    this.serviceAdmin.notifyUser(id).subscribe(res=>{
      console.log("Notification sent to User")
    })
  }
  
  public addNotificationAccepte(id:number,nom:string):void{

    this.message="Votre Demande à la validation d'un compte propre à notre entreprise "+nom+" est Acceptée";
    this.NotificationForm.get('content')?.setValue(this.message);
    this.serviceAdmin.addNotifUser(id,this.NotificationForm.value).subscribe(
      (response: Notification) => {
        console.log(response);
        this.notifyUser(id);
  
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
    
      }
    );
  
  }



}
