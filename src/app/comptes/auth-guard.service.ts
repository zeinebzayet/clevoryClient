import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

    canActivate() {
      if(localStorage.getItem("Role")===null){

        window.alert("Vous devez vous authentifier")  ;
        this.router.navigate([`${''}` ]);
        return  false ;
        
      }
      if((localStorage.getItem("Role")==="client") || (localStorage.getItem("Role")==="formateur") || (localStorage.getItem("Role")==="entreprise")){

        return true;
       
      }else{
       window.alert("Vous devez vous authentifier")  ;
       this.router.navigate([`${''}` ]);
    
        return  false ;
  
      }
    }
  }

