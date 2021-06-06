import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inscription } from 'src/app/examens/examens.component';
import { demande } from 'src/app/formations/formations.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.css']
})
export class DemandeClientComponent implements OnInit {

  public demandes!:demande[];
  public details!:demande;
  constructor(public demandeService:ClientService) { }

  ngOnInit(): void {

    this.demandeService.getDemandes().subscribe(
      (response: demande[]) => { 
        console.log(response);
        this.demandes=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  
  public onOpenModal(d: demande, mode: string): void {
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'details') {
      this.details = d;
      button.setAttribute('data-target', '#detailsCours');
    }



    container.appendChild(button);
    button.click();
  }





}
