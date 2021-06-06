import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientEseService } from 'src/app/layout/client-entreprise/client-ese.service';
import { AdminEseService } from 'src/app/layout/entreprise-layout/admin-ese.service';
import { client_entreprise } from 'src/app/layout/entreprise-layout/employees/employees.component';
import { Entreprise, Notification } from 'src/app/layout/entreprise-layout/formations-entreprise/formations-entreprise.component';
import { NavclientService } from './navclient.service';
 
@Component({
  selector: 'app-client-ese',
  templateUrl: './client-ese.component.html',
  styleUrls: ['./client-ese.component.css']
})
export class ClientEseComponent implements OnInit {

  
  nom:any;
  prenom:any;
  entreprise!:Entreprise[];
  e:any;
  public val:any;
  client!:client_entreprise;
  notification_number : any
  public message!:string;
  tr='zrzr'
  notification_list:Array<any>=[''];
   notifications!:  Notification[];
   NotificationForm =new FormGroup({
    content: new FormControl()
});
  constructor(private router: Router,public serviceAdmin:AdminEseService,private service: NavclientService,public profilService:ClientEseService,private webSocketService:ClientEseService) { 
    this.notification_number=0;
    let stompClient = this.serviceAdmin.connect();
    stompClient.connect({}, frame => {

      stompClient.subscribe('/topic/user/'+localStorage.getItem("cin"), notifications => {
        var x=JSON.parse(notifications.body)
        this.notification_list.unshift(x.content)
        this.notification_number++
    
        })

  });
  this.serviceAdmin.getNbNotif().subscribe(
    (response: number) => {
      console.log(response);
      this.notification_number+= response;
    
    });

  }
  ngOnInit(): void {
  
    this.nom=localStorage.getItem("username");
    this.prenom=localStorage.getItem("prenom");
 



    this.serviceAdmin.getAllEntreprise().subscribe(
      (response: Entreprise[]) => { 
        console.log(response);
        this.entreprise=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.profilService.getClient().subscribe(
      (response: client_entreprise) => { 
        console.log(response);
        this.client=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.getNotif();
    
  }

 

  NotifyAdminEse()
  {
    this.webSocketService.notifyAdminEse().subscribe(res=>{
      console.log("Notification sent to Admin")
    })
  }

  addNotif()
  {
      this.notification_number++;
  }


  public getNotif(): void {
    this.profilService.getAllNotification().subscribe((data: Notification[]) => {
      console.log(data);
      this.notifications=data;
  
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}



public addNotification():void{

  this.message="Le client "+localStorage.getItem("username")+" "+localStorage.getItem("prenom")+" a demandé un compte de la part de votre entreprise ";
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

nbNotif(){
  this.serviceAdmin.updateNotif().subscribe(
    (response: void) => {
      console.log(response);
      this.serviceAdmin.getNbNotif().subscribe(
        (response: number) => {
          console.log(response);
          this.notification_number= response;
        
        });
  
     
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }


  );
}

  onItemChange(value:any){
    console.log(" Value is : ", value );
    this.val=value;}

  adddemande()
  {
  
      this.service.addDemandeentreprise(this.val).subscribe(
        (response: demandeentreprise) => {

    
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
       
        }
      );
    }
  

   logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }

}
export class demandeentreprise{
  id!:number
  entreprise!:Entreprise;
  client!:client_entreprise;
  date!:Date;
  etat!:string;
}
