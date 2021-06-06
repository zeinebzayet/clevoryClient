import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { examens, inscription } from 'src/app/examens/examens.component';
import { ExamensService } from 'src/app/examens/examens.service';
import { Notification } from '../../entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ClientService } from '../client.service';


@Component({
  selector: 'app-examens-client',
  templateUrl: './examens-client.component.html',
  styleUrls: ['./examens-client.component.css']
})
export class ExamensClientComponent implements OnInit {

  public examens:any 
  public demandeExamen!:examens;
  public message!:string;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[' ',' ',' ',' ',' ']
  NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(private examensService: ExamensService,private webSocketService:ClientService,private toastr: ToastrService) { }

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

    this.message="Le client "+localStorage.getItem("cin")+" veut s'inscrire à l'examen "+libelle;
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

  
  public onOpenModal(exam: examens, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.demandeExamen= exam;
      button.setAttribute('data-target', '#demandeModal');
    }
    container.appendChild(button);
    button.click(); 
  }

  /*public demande(id:number,addForm: NgForm):void{
    this.examensService.addDemande(id,addForm.value).subscribe(
      (response: inscription) => {
        console.log(response);
  

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(inscription)
   
      }
    );
  }*/
  

}
