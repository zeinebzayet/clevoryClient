import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { examens, inscription } from 'src/app/examens/examens.component';
import { ExamensService } from 'src/app/examens/examens.service';
import { Notification } from '../../entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ClientEseService } from '../client-ese.service';

@Component({
  selector: 'app-examen-client-entreprise',
  templateUrl: './examen-client-entreprise.component.html',
  styleUrls: ['./examen-client-entreprise.component.css']
})
export class ExamenClientEntrepriseComponent implements OnInit {

public examens:any 
  public demandeExamen!:examens;
  public message!:string;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[' ',' ',' ',' ',' ']
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  listHreure: any;

  angForm =new FormGroup({
    date: new FormControl(),
    time: new FormControl()
  
    
  });

  account_validation_messages = {
    'date': [
      { type: 'required', message: 'date est obligatoire' },
    ],
    'time': [
      { type: 'required', message: 'time est obligatoire' },
    ]};

  constructor(private clientService: ClientEseService,private examensService:ExamensService,private webSocketService:ClientEseService,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getExamens();
    this.createForm()
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

    this.message="Le client "+localStorage.getItem("username")+" "+localStorage.getItem("prenom")+" veut s'inscrire à l'examen "+libelle;
    this.NotificationForm.get('content')?.setValue(this.message);
    this.webSocketService.addNotifAd(this.NotificationForm.value).subscribe(
      (response: Notification[]) => {
        console.log(response);
        this.NotifyAdmin()
        this.ngOnInit()
  
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
    
      }
    );
  
  }


  createForm() {
    this.angForm = this.fb.group({
       date:['', Validators.required],
       time:['', Validators.required],
    }
   );;
  
   
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
  
  public onOpenModal(exam: examens, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.demandeExamen= exam;
     
      this.clientService.ExitInscription(this.demandeExamen.id).subscribe((
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

  /*public demande(id:number,addForm: NgForm):void{
   
    this.clientService.addDemande(id,addForm.value).subscribe(
      (response: inscription) => {
        console.log(response);
        this.ngOnInit()
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(inscription)
   
      }
    );
  }*/


  public demande(id:number):void{
   
   

    this.clientService.addDemande(id,this.angForm.value).subscribe(
      (response: inscription) => {
        console.log(response);
        this.ngOnInit()
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(inscription)
   
      }
    );
  }


  public getHeureDispo(date:Date){
    this.clientService.heureDispo(date).subscribe(
      (response: []) => {
        this.listHreure = response;
        console.log(this.examens);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  
  }



  
}
