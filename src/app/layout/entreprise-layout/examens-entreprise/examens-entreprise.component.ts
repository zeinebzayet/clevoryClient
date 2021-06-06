import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { examens } from 'src/app/examens/examens.component';
import { ClientService } from '../../client-layout/client.service';

import { AdminEntreprise, demande, Formations, Notification } from '../formations-entreprise/formations-entreprise.component';
import { ExamenEseService } from './examen-ese.service';

@Component({
  selector: 'app-examens-entreprise',
  templateUrl: './examens-entreprise.component.html',
  styleUrls: ['./examens-entreprise.component.css']
})
export class ExamensEntrepriseComponent implements OnInit {

  public examens:any 
  public demandeExamen!:examens;
  public message!:string;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[' ',' ',' ',' ',' ']
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(private examensService: ExamenEseService,private webSocketService:ClientService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getExamens();
  }
  
  public getExamens(): void {
    this.examensService.getAllExamens().subscribe(
      (response: examens[]) => {
        this.examens = response;
        console.log(this.examens);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addNotification(libelle:string):void{

    this.message="L'admin "+localStorage.getItem("username")+" de l'entreprise "+localStorage.getItem("nomEse")+" a demandé un voucher pour l'examen "+libelle;
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

  
  public onOpenModal(examen: examens, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.demandeExamen= examen;
      button.setAttribute('data-target', '#demandeModal');
    }
    container.appendChild(button);
    button.click(); 
  }

  public demande(id:number,addForm: NgForm):void{
    this.examensService.addDemande(id,addForm.value).subscribe(
      (response: demande) => {
        console.log(response);
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(demande)
   
      }
    );
  }

  public searchExamen(key: string): void {
    console.log(key);
    const results: examens[] = [];
    for (const exam of this.examens) {
      if (exam.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      exam.code.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      exam.constructeur.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      exam.technologie.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      exam.duree.toString().indexOf(key.toLowerCase()) !== -1 ||
        exam.niveau.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        exam.description.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        exam.prix.toString().indexOf(key.toLowerCase()) !== -1  ) {
        results.push(exam);
      }
    }
    this.examens = results;
    if (results.length === 0 || !key) {
      this.getExamens();
    }
  }

}

export class demandeE{
  formation!:Formations;
  examen!:examens;
  adminEntreprise!:AdminEntreprise;
  date!:Date;
  nbPlace!:number;
  etat!:string;
}



