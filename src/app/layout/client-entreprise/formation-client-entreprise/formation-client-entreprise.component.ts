import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormationService } from 'src/app/formations/formation.service';
import { demande, Formations } from 'src/app/formations/formations.component';
import { Notification } from '../../entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ClientEseService } from '../client-ese.service';

@Component({
  selector: 'app-formation-client-entreprise',
  templateUrl: './formation-client-entreprise.component.html',
  styleUrls: ['./formation-client-entreprise.component.css'],
  providers: [DatePipe]
})
export class FormationClientEntrepriseComponent implements OnInit {

  public formations: any
  public salles: any
  public verif: any = 0;
  public nb: any = 0;
  public demandeFormation!: Formations;
  public message!: string;
  public myDate:any = new Date();
  notification_number: any

  tr = 'zrzr'
  notification_list: Array<any> = [' ', ' ', ' ', ' ', ' ']
  NotificationForm = new FormGroup({
    content: new FormControl()
  });
  constructor(private formationService: FormationService,private clientService:ClientEseService, private webSocketService: ClientEseService,private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //console.log(this.myDate)
   }

  ngOnInit(): void {
    this.getFormations();
  }

  public addNotification(libelle: string): void {

    this.message = "Le client " + localStorage.getItem("username") + " " + localStorage.getItem("prenom") + " a demandé une devis pour la formation " + libelle;
    this.NotificationForm.get('content')?.setValue(this.message);
    this.webSocketService.addNotifAd(this.NotificationForm.value).subscribe(
      (response: Notification[]) => {
        console.log(response);
        this.NotifyAdmin();
        this.ngOnInit()


      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );

  }

  NotifyAdmin() {
    this.webSocketService.notifyAdmin().subscribe(res => {
      console.log("Notification sent to  Afmin")
    })
  }
  addNotif() {
    this.notification_number++;
  }


  public ExistDemande(id: number): number {

    this.clientService.ExitDemande(id).subscribe(
      (response: number) => {
        this.verif = response;
      }
    );
    return this.verif;
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

  public onOpenModal(formation: Formations, mode: string): void {

    const container: any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'demande') {
      this.demandeFormation = formation;
      console.log(this.demandeFormation.id)

      this.clientService.ExitDemande(this.demandeFormation.id).subscribe((
        response: number) => {
        console.log(response);
        if (response == 0) {
          button.setAttribute('data-target', '#demandeModal');
          container.appendChild(button);
          button.click();
        }
        
        else {
          button.setAttribute('data-target', '#alertModal');
          container.appendChild(button);
          button.click();
        }
      }
      );

    }

  }

  public demande(id: number): void {
    this.clientService.addDemandeFormation(id).subscribe(
      (response: demande) => {
        console.log(response);
        this.ngOnInit()


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(demande)

      }
    );
  }


  public getFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (response: Formations[]) => {

        this.formations = response;


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }








}
