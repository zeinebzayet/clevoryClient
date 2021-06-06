import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../comptes/auth.service';
import { TokenStorageService } from '../comptes/token-storage.service';
import { AdminEseService } from '../layout/entreprise-layout/admin-ese.service';
import { FormationService } from './formation.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  providers: [DatePipe]
})
export class FormationsComponent implements OnInit {

  public formations:any 
  public val:any;
  public salles: any;
  public myDate:any = new Date();
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  form1: any = {
    username: null,
    password: null
  };

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
    cpassword: new FormControl(),});

    isSuccessful = false;
  isSignUpFailed = false;
  constructor(private service: AdminEseService,private formationService: FormationService,private authService: AuthService,private tokenStorage: TokenStorageService,private router: Router,private fb: FormBuilder,private datePipe: DatePipe) { 
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getFormations();
    if (this.tokenStorage.getToken()) 
    {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.createForm();
  }
    
    
  
  public getFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (response: Formations[]) => {
        this.formations = response;
        
        console.log(this.formations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
onSubmit2(f: NgForm): void {
  //const { username, password } = this.form;

  this.authService.login(f.value).subscribe(
    data => {
      
      if(data['authenticated']=== true){
        localStorage.setItem("Role",data.principal.role);
        
        if(localStorage.getItem("Role")==="client"){ 
          localStorage.setItem("cin",data.principal.cin)
          localStorage.setItem("username",data.principal.username)
          localStorage.setItem("prenom",data.principal.prenom)
          localStorage.setItem("entreprise",data.principal.entreprise)
            this.router.navigate(['./formationsClientEse']);
            console.log(data.principal);
        }

        if(localStorage.getItem("Role")==="entreprise"){
          console.log(data.principal.entreprise.rcs)
          localStorage.setItem("rcs",data.principal.entreprise.rcs)
          localStorage.setItem("nomEse",data.principal.entreprise.nom)
          localStorage.setItem("cin",data.principal.cin)
          localStorage.setItem("username",data.principal.username)
          localStorage.setItem("prenom",data.principal.prenom)
            this.router.navigate(['./formationsEntreprise']);
        }
    }},
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}

  
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



  createForm() {
    this.angForm = this.fb.group({
       cin: ['',Validators.compose( [
                 Validators.required,Validators.minLength(8), Validators.pattern(/^[0-9]+$/)])],
       username: ['', Validators.compose( [Validators.maxLength(25),
                  Validators.required ,  ])],
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
   );; }

   onItemChange(value:any){
    console.log(" Value is : ", value );
    this.val=value;
  }


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


public searchFormation(key: string): void {
  console.log(key);
  const results: Formations[] = [];
  for (const f of this.formations) {
    if (f.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    f.description.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    f.constructeur.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
      results.push(f);
    }
  }
  this.formations = results;
  if (results.length === 0 || !key) {
    this.ngOnInit();
  }
}


}


export class Formations {
  id!: number;
  libelle!: string;
  description!: string;
  constructeur!:string
  datedeb!: Date;
  datefin!: Date
  prix!: number;
  support_cours!: string;
  formateur!: Formateur;
  salle!: salles;

}

export class salles {
  id!: number;
  nom!: string;
  capacite!: number;
}

export class Formateur
{
  cin!:number
  nom !:string
  prenom!:string
  password!:string
  email!:string
  adresse!:string
  tel!:string
}
export class ClientPassager{
  cin!:number;
  adresse!:string;
  email!:string;
  fileName!:string;
  prenom!:string;
  tel!:number;
  username!:string;
  niveau!:string;
 
}
export class demande{
  formation!:Formations;
  client!:ClientPassager;
  date!:Date;
  etat!:string;
}
