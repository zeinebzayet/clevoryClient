import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Voucher } from '../../entreprise-layout/employees/employees.component';
import { ClientEseService } from '../client-ese.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { examens, inscription } from 'src/app/examens/examens.component';
import { Notification } from '../../entreprise-layout/formations-entreprise/formations-entreprise.component';
@Component({
  selector: 'app-mesvoucherexamen',
  templateUrl: './mesvoucherexamen.component.html',
  styleUrls: ['./mesvoucherexamen.component.css'],

})
export class MesvoucherexamenComponent implements OnInit {

  public voucherF !: Voucher[]
  details!: Voucher;
  submitted = false;
  public examens: any
  public demandeExamen!: examens;
  public message!: string;
  notification_number: any
  tr = 'zrzr'
  notification_list: Array<any> = [' ', ' ', ' ', ' ', ' ']
  NotificationForm = new FormGroup({
    content: new FormControl()
  });

  /*public disabledDates: Date[] = [
    new Date(2021, 6, 9,12,30),
    new Date(2021, 5, 4,12,30),
    new Date(2021, 4, 2,12,30),
    new Date(2021, 3, 4,12,30),
    new Date(2021, 2, 9,12,30),
    new Date(2021, 6, 12,12,30),
    new Date(2021, 6, 22,12,30)
  ];
  public popupSettings: PopupSettings = {
    appendTo: 'component',
    animate: false,
    popupClass: 'crimson'
};*/

  listHreure: any;
  public inscriptions!:inscription[];
  angForm = new FormGroup({
    date: new FormControl(),
    time: new FormControl()


  });

  account_validation_messages = {
    'date': [
      { type: 'required', message: 'date est obligatoire' },
    ],
    'time': [
      { type: 'required', message: 'time est obligatoire' },
    ]
  };
  constructor(public clientService: ClientEseService, public fb: FormBuilder, private webSocketService: ClientEseService) { }

  ngOnInit(): void {
    this.clientService.getVoucherexamen().subscribe(
      (response: Voucher[]) => {
        console.log(response);
        this.voucherF = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.createForm();

  }


  /*public getInscriptions(exam:examens): void {
    this.clientService.getAllInsc(exam).subscribe(
      (response: inscription[]) => {

        this.inscriptions = response;


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  createForm() {
    this.angForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    }
    );;
  }


  public demande(id: number): void {
    this.submitted = true;
    this.clientService.addDemande(id, this.angForm.value).subscribe(
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


  public getHeureDispo(date: Date) {
    this.clientService.heureDispo(date).subscribe(
      (response: []) => {
        this.listHreure = response;
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }




  public onOpenModal(table: any, mode: string): void {
    const container: any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if (mode === 'details') {
      this.details = table;
      button.setAttribute('data-target', '#detailsCours');
      
    container.appendChild(button);
    button.click();
    }
    if (mode === 'insc') {
      this.details = table;
      this.clientService.getAllInsc(this.details.demandeVoucher.examen.id).subscribe(
        (response: inscription[]) => {
          console.log(response);
       
          if (response.length == 0) {
            button.setAttribute('data-target', '#inscrip');
            container.appendChild(button);
            button.click();
        }
        else{
          button.setAttribute('data-target', '#alertModal');
          container.appendChild(button);
          button.click();
        }
      }
      );

    }
  }
  





  public searchExamen(key: string): void {
    console.log(key);
    const results: Voucher[] = [];
    for (const v of this.voucherF) {
      if (v.code.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        v.demandeVoucher.examen.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(v);
      }
    }
    this.voucherF = results;
    if (results.length === 0 || !key) {
      this.ngOnInit();
    }
  }








  NotifyAdmin() {
    this.webSocketService.notifyAdmin().subscribe(res => {
      console.log("Notification sent to  Afmin")
    })
  }
  NotifyAdminEse()
  {
    this.webSocketService.notifyAdminEse().subscribe(res=>{
      console.log("Notification sent to Admin")
    })
  }
  addNotif() {
    this.notification_number++;
  }

  public addNotificationAdminEse(libelle:string,code:string):void{

    this.message="L'employé "+localStorage.getItem("username")+" "+localStorage.getItem("prenom")+" a utilisé le voucher "+code+" pour l'examen"+libelle;
    this.NotificationForm.get('content')?.setValue(this.message);
    this.webSocketService.addNotifEse(this.NotificationForm.value).subscribe(
      (response: Notification) => {
        console.log(response);
        this.NotifyAdminEse()
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
    
      }
    );
  
  }



  public addNotification(libelle: string): void {

    this.message = "Le client " + localStorage.getItem("username") + " " + localStorage.getItem("prenom") + " veut s'inscrire à l'examen " + libelle + " par l'utilisation d'un voucher assigné par son entreprise";
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

}
