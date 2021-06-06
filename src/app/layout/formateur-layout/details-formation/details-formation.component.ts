import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmploiService } from '../emploi/emploi.service';
import { filter } from 'rxjs/operators';
import { demande, Formateur, Formations, salles } from 'src/app/formations/formations.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormateurService } from '../formateur.service';
@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.css']
})
export class DetailsFormationComponent implements OnInit {

  formation!:number;
  public demandes : any;
  public formations!:Formation;
  public demandeClient!:demande;

  constructor(public emploiService: EmploiService,private serviceFormateur: FormateurService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
    filter(params => params.formation))
    .subscribe(params => {
      console.log(params); 

      this.formation = params.formation;
      console.log(this.formation);
    }
    );
    this.getFormation();

    this.serviceFormateur.getListEtudiants(this.formation).subscribe(
      (response: demande []) => {
        this.demandes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  getFormation():void
  {
    this.emploiService.getformationById(this.formation).subscribe(
      (response: Formation) => {
        this.formations = response;
        
        console.log(this.formations);
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
 
    if (mode === 'detailsEtudiant') {
      this.demandeClient= d;
      button.setAttribute('data-target', '#demandeModal');
    }
  
    container.appendChild(button);
    button.click(); 
  }

 

}


export class Formation {
  id!: number;
  libelle!: string;
 constructeur!:string;
 technologie!:string;
  description!: string;
  datedeb!: Date;
  datefin!: Date
  prix!: number;
  support_cours!: string;
  formateur!: Formateur;
  salle!: salles;

}
