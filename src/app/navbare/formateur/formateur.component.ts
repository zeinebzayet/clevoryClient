import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
nom:any;
prenom:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nom=localStorage.getItem("username");
    this.prenom=localStorage.getItem("prenom");

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }
}
