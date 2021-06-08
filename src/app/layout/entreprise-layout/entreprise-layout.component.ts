import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { examens } from 'src/app/examens/examens.component';
import { Formation } from '../formateur-layout/details-formation/details-formation.component';
import { AdminEntreprise } from './formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-entreprise-layout',
  templateUrl: './entreprise-layout.component.html',
  styleUrls: ['./entreprise-layout.component.css']
})
export class EntrepriseLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

   
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }

}

export class DemandeVoucher
{
  id!:number
  date!:Date
  etat!:string
  nb_place!:number
  admin_ese_id!:AdminEntreprise
  examen_id!:examens
  formation!:Formation
}
