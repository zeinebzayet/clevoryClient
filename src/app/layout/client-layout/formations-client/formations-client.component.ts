import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormationService } from 'src/app/formations/formation.service';
import { demande } from 'src/app/formations/formations.component';
import { Notification } from '../../entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-formations-client',
  templateUrl: './formations-client.component.html',
  styleUrls: ['./formations-client.component.css']
})
export class FormationsClientComponent implements OnInit {

  public formations:any 
  public salles: any
  public demandeFormation!:Formations;
  public message!:string;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[' ',' ',' ',' ',' ']
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(private formationService: FormationService,private webSocketService:ClientService,private toastr: ToastrService) {  
   
}

public addNotification(libelle:string):void{

  this.message="Le client "+localStorage.getItem("cin")+" a demandé une devis pour la formation "+libelle;
  this.NotificationForm.get('content')?.setValue(this.message);
  this.webSocketService.addNotif(this.NotificationForm.value).subscribe(
    (response: Notification) => {
      console.log(response);
      this.NotifyAdmin()

  
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
  
    }
  );

}

NotifyAdmin()
{
  this.webSocketService.notifyAdmin().subscribe(res=>{
    console.log("Notification sent to  Afmin")
  })
}
addNotif()
{
    this.notification_number++;
}


  ngOnInit(): void {
    this.getFormations();
  }


  
  public onOpenModal(formation: Formations, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.demandeFormation= formation;
      button.setAttribute('data-target', '#demandeModal');
    }
    container.appendChild(button);
    button.click(); 
  }

 /* public demande(id:number):void{
    this.formationService.addDemande(id).subscribe(
      (response: demande) => {
        console.log(response);
     
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(demande)
   
      }
    );
  }*/
  
  
  public getFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (response: Formations[]) => {
        this.formations = response;
        
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

export class Formations {
  id!: number;
  libelle!: string;
  description!: string;
  datedeb!: Date;
  datefin!: Date
  prix!: number;
  support_cours!: string;
  formateur!: Formateur;
  salle!: salles;

}

export class salles {
  id!: number;
  nom!: string;
  capacite!: number;
}

export class Formateur
{
  cin!:number
  nom !:string
  prenom!:string
  password!:string
  email!:string
  adresse!:string
  tel!:string
}

export class Personne
{
  cin!:number
  nom !:string
  prenom!:string
  password!:string
  email!:string
  adresse!:string
  tel!:string
}



