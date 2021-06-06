
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur-layout',
  templateUrl: './formateur-layout.component.html',
  styleUrls: ['./formateur-layout.component.css']
})
export class FormateurLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

   
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }

  

}

export class Formateur {
  cin!: number;
  username!: string;
  prenom!: string;
  email!: string;
  tel!: number;
  password!: string;
  adresse!: string;
  fileName!:string;
  experience!: string;
  dernier_diplome!: string;
  competence!: string;
  specialite!: string;
  grade!: string;
  typeformateur!: string;
}
