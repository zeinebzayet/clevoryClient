import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inscription } from 'src/app/examens/examens.component';
import { ClientEseService } from '../client-ese.service';

@Component({
  selector: 'app-inscription-examen',
  templateUrl: './inscription-examen.component.html',
  styleUrls: ['./inscription-examen.component.css']
})
export class InscriptionExamenComponent implements OnInit {

  public inscriptions!:inscription[];
  public details!:inscription;
  constructor(public demandeService:ClientEseService) { }

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
