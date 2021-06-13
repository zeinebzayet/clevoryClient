import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/comptes/auth.service';
import { TokenStorageService } from 'src/app/comptes/token-storage.service';
import { AdminEseService } from 'src/app/layout/entreprise-layout/admin-ese.service';
import { Entreprise } from 'src/app/layout/entreprise-layout/formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public val:any;
  //angForm!: FormGroup; 
  angForm =new FormGroup({
    username: new FormControl(),
    prenom: new FormControl(),
    cin: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    tel: new FormControl(),
    adresse: new FormControl(),
    niveau: new FormControl(),
    role: new FormControl(),
    cpassword: new FormControl(),

    
});
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email est obligatoire' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'cin': [
      { type: 'required', message: 'Cin est obligatoire ' },
     { type: 'minlength', message: 'Cin doit comporter 8 chiffre' },
     { type: 'pattern', message: 'Cin doit contenir des chiffres seulement' }
    ],
    'prenom': [
      { type: 'required', message: 'prenom est obligatoire' },
    ],
    'username': [
      { type: 'required', message: 'username est obligatoire' },
    ],
    'adresse': [
      { type: 'required', message: 'adresse est obligatoire' },
    ],
    'tel': [
      { type: 'required', message: 'Tel est obligatoire' },
      {type: 'minlength', message: 'Tel doit comporter au moins 8 chiffre'  },
      { type: 'pattern', message: 'Cin doit contenir des chiffres seulement' }
    ],
    'niveau': [
      { type: 'required', message: 'niveau est obligatoire'  }
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm password est obligatoire' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password est obligatoire' },
      { type: 'minlength', message: 'Password doit comporter au moins 5 caractères' },
      { type: 'pattern', message: 'Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre' }
    ],
    }
  
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

 
  constructor(private service: AdminEseService,private authService: AuthService,private tokenStorage: TokenStorageService,private router: Router,private fb: FormBuilder) { 

   

  }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.createForm();
    
  }
  createForm() {
    this.angForm = this.fb.group({
       cin: ['',Validators.compose( [
                 Validators.required,Validators.minLength(8), Validators.pattern(/^[0-9]+$/)])],
       username: ['', Validators.compose( [Validators.maxLength(25),
                  Validators.required , ])],
       prenom: ['', Validators.required ],
       email: ['', Validators.compose( [
                  Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
       password: ['',  Validators.compose([
                      Validators.minLength(5),
                      Validators.required,
                      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
       adresse: ['', Validators.required ],
       tel: ['',Validators.compose( [Validators.minLength(8),Validators.required ,Validators.pattern(/^[0-9]+$/)])],
       niveau: ['', Validators.required ],
       role:['client',''],
       cpassword:['', Validators.required],

    }
   );;

   
  }


  onItemChange(value:any){
    console.log(" Value is : ", value );
    this.val=value;}



 onSubmit(): void {

  
  this.service.addClientTest(this.angForm.value).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
      console.log(this.angForm)
    }
  );

  
}



onSubmit2(f: NgForm): void {
  this.authService.login(f.value).subscribe(
    data => {
      
      if(data['authenticated']=== true){
    
        localStorage.setItem("Role",data.principal.role);
        
        if(localStorage.getItem("Role")==="formateur"){
          localStorage.setItem("cin",data.principal.cin)
          localStorage.setItem("username",data.principal.username)
          localStorage.setItem("prenom",data.principal.prenom)
           
            this.router.navigate(['./formateur']);
        
        }
        
        if(localStorage.getItem("Role")==="client"){ 
          localStorage.setItem("cin",data.principal.cin)
          localStorage.setItem("username",data.principal.username)
          localStorage.setItem("prenom",data.principal.prenom)
         if(data.principal.entreprise!=null && data.principal.entreprise.rcs!=null){
          localStorage.setItem("entreprise",data.principal.entreprise)
          localStorage.setItem("rcs",data.principal.entreprise.rcs)
         }
            this.router.navigate(['./clientEse']);
            
            console.log(data.principal);
        }


        if(localStorage.getItem("Role")==="entreprise"){
          console.log(data.principal.entreprise.rcs)
          console.log(data.principal.cin)
          localStorage.setItem("rcs",data.principal.entreprise.rcs)
          localStorage.setItem("nomEse",data.principal.entreprise.nom)
          localStorage.setItem("cin",data.principal.cin)
          localStorage.setItem("username",data.principal.username)
          localStorage.setItem("prenom",data.principal.prenom)
            this.router.navigate(['./entreprise']);
        }
        
        
        console.log(data)
        console.log(data.principal.role)

     
    
    
    }
        
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}



public onOpenModal(mode: string): void {
     
  const container:any= document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'login') {
    button.setAttribute('data-target', '#loginModal');
  }

  

  container.appendChild(button);
  button.click(); 
}

}

export class personne{
  cin!:number;
   
    username!: string;
    prenom!: string;
    email!: string;
    password!: string;
    adresse!: string;
    tel!: number;
    role!:string;
    entreprise!:Entreprise
    
}

