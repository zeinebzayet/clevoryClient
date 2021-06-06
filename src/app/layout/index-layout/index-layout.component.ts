import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { examens } from 'src/app/examens/examens.component';
import { ExamensService } from 'src/app/examens/examens.service';
import { FormationService } from 'src/app/formations/formation.service';
import { Formations } from 'src/app/formations/formations.component';
import { Formateur } from '../formateur-layout/formateur-layout.component';
import { FormateurService } from '../formateur-layout/formateur.service';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.css']
})
export class IndexLayoutComponent implements OnInit {

  public examens:any ;
  public formateurs:any;
  public formations:any 
  constructor(private examensService: ExamensService,private formationService: FormationService,private router: Router,public profilService:FormateurService) { }

  ngOnInit(): void {
this.getExamens();
this.getFormations();
this.getFormateurs();
  }

  public getExamens(): void {
    this.examensService.getLastExamens().subscribe(
      (response: examens[]) => {
        this.examens = response;
        console.log(this.examens);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFormateurs(): void {
    this.formationService.getLastFormateur().subscribe(
      (response: Formateur[]) => {
        this.formateurs = response;
        
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFormations(): void {
    this.formationService.getLastFormation().subscribe(
      (response: Formations[]) => {
        this.formations = response;
        
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  goToPage(pageName:string):void
  {
    this.router.navigate([`${pageName}` ]);
  }

}
