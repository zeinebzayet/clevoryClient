import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/layout/client-layout/client.service';
import { AdminEseService } from 'src/app/layout/entreprise-layout/admin-ese.service';
import { Notification } from 'src/app/layout/entreprise-layout/formations-entreprise/formations-entreprise.component';


@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  username:any;
  prenom:any;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[''];
   notifications!:  Notification[];
  constructor(private webSocketService:AdminEseService,private toastr: ToastrService,private router: Router) { 

    this.notification_number=0;
      let stompClient = this.webSocketService.connect();
      stompClient.connect({}, frame => {

        stompClient.subscribe('/topic/user/'+localStorage.getItem("cin"), notifications => {
          var x=JSON.parse(notifications.body)
          this.notification_list.unshift(x.content)
          this.notification_number++
          this.toastr.toastrConfig.positionClass = 'toast-top-left';
          this.toastr.toastrConfig.timeOut=2000;
          this.toastr.success(x.content,"Notification")
          })

    });
    this.webSocketService.getNbNotif().subscribe(
      (response: number) => {
        console.log(response);
        this.notification_number+= response;
      
      });

  }

  NotifyAdmin()
  {
    this.webSocketService.notifyAdmin().subscribe(res=>{
      console.log("Notification sent to Admin")
    })
  }
  addNotif()
  {
      this.notification_number++;
  }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.prenom=localStorage.getItem("prenom");
    this.getNotif();
  }

  public getNotif(): void {
    this.webSocketService.getAllNotification().subscribe((data: Notification[]) => {
      console.log(data);
      this.notifications=data;
  
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

nbNotif(){
  this.webSocketService.updateNotif().subscribe(
    (response: void) => {
      console.log(response);
      this.webSocketService.getNbNotif().subscribe(
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

logout(){
  localStorage.clear();
  this.router.navigate(['']);
  
}
  

}
