import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { examens } from 'src/app/examens/examens.component';
import { ClientService } from '../../client-layout/client.service';
import {  Personne } from '../../client-layout/formations-client/formations-client.component';
import { AdminEseService } from '../admin-ese.service';
import { FormationEseService } from './formation-ese.service';

@Component({
  selector: 'app-formations-entreprise',
  templateUrl: './formations-entreprise.component.html',
  styleUrls: ['./formations-entreprise.component.css'],
  providers: [DatePipe]
})
export class FormationsEntrepriseComponent implements OnInit {

  public formations:any 
  public salles: any
  public demandeFormation!:Formations;
  public myDate:any = new Date();
  public message!:string;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[' ',' ',' ',' ',' ']
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(private formationService: FormationEseService,private webSocketService:AdminEseService,private datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  ngOnInit(): void {
    this.getFormations();
  }


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

  public demande(id:number,addForm: NgForm):void{
    this.formationService.addDemande(id,addForm.value).subscribe(
      (response: demande) => {
        console.log(response);
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(demande)
   
      }
    );
  }


  public addNotification(libelle:string):void{

    this.message="L'admin "+localStorage.getItem("username")+" de l'entreprise "+localStorage.getItem("nomEse")+" a demandé un voucher pour la formation "+libelle;
    this.NotificationForm.get('content')?.setValue(this.message);
    this.webSocketService.addNotifAd(this.NotificationForm.value).subscribe(
      (response: Notification[]) => {
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

  public searchFormation(key: string): void {
    console.log(key);
    const results: Formations[] = [];
    for (const f of this.formations) {
      if (f.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      f.description.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      f.constructeur.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(f);
      }
    }
    this.formations = results;
    if (results.length === 0 || !key) {
      this.ngOnInit();
    }
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
  password!:string;

  email!:string
  adresse!:string
  tel!:string
}

export class Entreprise {
  rcs!: number;
  nom!: string;

}

export class AdminEntreprise {
  cin!: number;
  username!: string;
  prenom!: string;
  email!: string;
  tel!: number;
  password!: string;
  adresse!: string;
  entreprise!:Entreprise;
  fileName!:string;

}
export class demande{
  formation!:Formations;
  adminEntreprise!:AdminEntreprise;
  date!:Date;
  nbPlace!:number;
  etat!:string;
}
export class Notification{
  id!:number;
  nombre!:number;
  content!:string;
  personne!:Personne;
}


