import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inscription } from 'src/app/examens/examens.component';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-demande-exam-client',
  templateUrl: './demande-exam-client.component.html',
  styleUrls: ['./demande-exam-client.component.css']
})
export class DemandeExamClientComponent implements OnInit {

  public inscriptions!:inscription[];
  public details!:inscription;
  constructor(public demandeService:ClientService) { }

  ngOnInit(): void {

    this.demandeService.getInscriptions().subscribe(
      (response: inscription[]) => { 
        console.log(response);
        this.inscriptions=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  

}
