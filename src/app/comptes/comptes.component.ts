import { Component, OnInit } from '@angular/core';
import {  Router, } from '@angular/router';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';



@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css'],

})



export class comptesComponent implements OnInit {


  form: any = {
    cin: null,
    username: null,
    prenom: null,
    email: null,
    password: null,
    adresse: null,
    tel: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  form1: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  router: Router;
  constructor(private authService: AuthService,private tokenStorage: TokenStorageService,router: Router) { 

    this.router = router;

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
 
  }
  onSubmit(): void {
    
  }

 /* onSubmit2(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['./dashboard']);
  
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }*/


}



