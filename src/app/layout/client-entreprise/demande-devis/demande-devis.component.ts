import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { demande } from 'src/app/formations/formations.component';
import { ClientEseService } from '../client-ese.service';

@Component({
  selector: 'app-demande-devis',
  templateUrl: './demande-devis.component.html',
  styleUrls: ['./demande-devis.component.css']
})
export class DemandeDevisComponent implements OnInit {

  public demandes!:demande[];
  public details!:demande;
  constructor(public demandeService:ClientEseService) {
    
   }

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