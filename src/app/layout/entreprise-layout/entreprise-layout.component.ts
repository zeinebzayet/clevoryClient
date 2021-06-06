import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
