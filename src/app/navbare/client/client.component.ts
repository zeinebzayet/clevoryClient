import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/layout/client-layout/client.service';
import { Notification } from 'src/app/layout/entreprise-layout/formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  username:any;
  prenom:any;
  notification_number : any
  tr='zrzr'
  notification_list:Array<any>=[''];
   notifications!:  Notification[];
  constructor(private webSocketService:ClientService,private toastr: ToastrService) { 

    this.notification_number=0;
      let stompClient = this.webSocketService.connect();
      stompClient.connect({}, frame => {

        stompClient.subscribe('/topic/user', notifications => {
          var x=JSON.parse(notifications.body)
          this.notification_list.unshift(x.content)
          this.notification_number++
          this.toastr.toastrConfig.positionClass = 'toast-top-left';
          this.toastr.toastrConfig.timeOut=2000;
          this.toastr.success(x.content,"Notification")
          })

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

}
