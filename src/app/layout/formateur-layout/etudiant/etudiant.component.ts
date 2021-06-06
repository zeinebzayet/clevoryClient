import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { demande, Formations } from 'src/app/formations/formations.component';
import { EmploiService } from '../emploi/emploi.service';
import { FormateurService } from '../formateur.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  public formations:any;
  public demandeFormation!:Formations;
  public demandes : any;

  constructor(private service :EmploiService,private serviceFormateur: FormateurService) { }

  ngOnInit(): void {
    this.getFormationByFormateur();
  }

  getFormationByFormateur():void
  {
    this.service.getformationByFormateur().subscribe(
      (response: Formations[]) => {
        this.formations = response;
        
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
  
  
  public onOpenModal(formation: Formations, mode: string): void {
     
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
 
    if (mode === 'demande') {
      this.demandeFormation= formation;
      button.setAttribute('data-target', '#demandeModal');
    }
    console.log(this.demandeFormation.id);
    this.serviceFormateur.getListEtudiants(this.demandeFormation.id).subscribe(
      (response: demande []) => {
        this.demandes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    container.appendChild(button);
    button.click(); 
  }
  

}
