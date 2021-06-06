import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf'
import { Formateur } from '../formateur-layout.component';

import { FormateurService } from '../formateur.service';
declare var $: any;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @ViewChild('htmlData') htmlData!:ElementRef;
  userFile:any ;
  public imagePath:any;
  imgURL: any;
  public formateur!:Formateur;
  public experiences!:Experience;
  public parcours!:Parcours;
  public editFormateur!:Formateur;
  public editExperience!:Experience;
  public editParcours!:Parcours;
  public editCertif!:Certification;
  public certification!:Certification;

  experienceForm =new FormGroup({
    datedeb: new FormControl(),
    datefin: new FormControl(),
    poste: new FormControl(),
    societe: new FormControl(),
    description: new FormControl()
});

parcoursForm =new FormGroup({
  datedeb: new FormControl(),
  datefin: new FormControl(),
  specialite: new FormControl(),
  etablissement: new FormControl()
});
certifForm =new FormGroup({
  datedeb: new FormControl(),
  nom: new FormControl(),
});


  constructor(public profilService:FormateurService,public fb: FormBuilder,private router: Router) { }
  get f() { return this.profilService.dataForm.controls; }

  ngOnInit(): void {

    this.profilService.getFormateur().subscribe(
      (response: Formateur) => { 
        console.log(response);
        this.formateur=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.profilService.getExperience().subscribe(
      (response: Experience) => { 
        console.log(response);
        this.experiences=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.profilService.getCertif().subscribe(
      (response: Certification) => { 
        console.log(response);
        this.certification=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );


    this.profilService.getParcours().subscribe(
      (response: Parcours) => { 
        console.log(response);
        this.parcours=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

 



    this.infoForm();
  
  }

  onSubmit() {
   
    this.addData();
   
 
}

  infoForm() {
    this.profilService.dataForm = this.fb.group({
        file: ['', [Validators.required]],
  
      });
    }
addData() {
  const formData = new  FormData();
  formData.append('file',this.userFile);
  console.log(formData)
  this.profilService.createData(formData).subscribe( data => {
    this.ngOnInit();
    
  });


  
}
public onAddParcours(): void{

  this.profilService.addParcours(this.parcoursForm.value).subscribe(
    (response: Parcours) => {
      console.log(response);
     
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onAddExperience(): void{

  this.profilService.addExperience(this.experienceForm.value).subscribe(
    (response: Experience) => {
      console.log(response);
     
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onOpenModal(table:any,mode: string): void {
  const container:any = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');


  if (mode === 'update') {
    button.setAttribute('data-target', '#update');
  }
  if (mode === 'addexperience') {
    button.setAttribute('data-target', '#addExperience');
  }
  if (mode === 'addparcours') {
    button.setAttribute('data-target', '#addParcours');
  }

  if (mode === 'add') {
    //this.updatePersonne=personne;
    button.setAttribute('data-target', '#addPhoto');
  }
  if (mode === 'edit') {
    this.editFormateur = table;
     button.setAttribute('data-target', '#updateFormateur');
   }
   if (mode === 'editExperience') {
    this.editExperience = table;
     button.setAttribute('data-target', '#updateExperience');
  
   }

   if (mode === 'editParcours') {
    this.editParcours = table;
     button.setAttribute('data-target', '#updateParcours');
  
   }
   if (mode === 'updateCertif') {
    this.editCertif = table;
     button.setAttribute('data-target', '#updateCertif');
  
   }

   if (mode === 'addcertification') {
     button.setAttribute('data-target', '#addcertification');
  
   }

  container.appendChild(button);
  button.click();
}
   

  public downloadPDF():void {
    let data = this.htmlData.nativeElement;
    let options : any = {
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      };
    let doc = new jsPDF(options);
     doc.html(data.innerHTML, {
      callback: function (doc) {
            doc.save("angular-demo.pdf");
          },
      margin:15,
      x: 10,
      y: 10
    });
  }


  onSelectFile(event:any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
  
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log( 'Only images are supported.');
      
      return;
    }
  
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }

    public onUpdateFormateur(formateur: Formateur): void {
      this.profilService.updateFormateur(formateur).subscribe(
        (response: Formateur) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onUpdateExperience(id:number,experience: Experience): void {
      this.profilService.updateExperience(id,experience).subscribe(
        (response: Experience) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      console.log(experience);
    }


    public onUpdateParcours(id:number,parcours: Parcours): void {
      this.profilService.updateParcours(id,parcours).subscribe(
        (response: Parcours) => {
          
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onAddCertif()
    {
      this.profilService.addCertif(this.certifForm.value).subscribe(
        (response: Certification) => {
         
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }

    public onupdateCertif(id:number,c:Certification)
    {
      this.profilService.updateCertif(id,c).subscribe(
        (response: Certification) => {
          
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }
    
  
}
export class Experience
{
  id!:number
  datedeb!:Date 
  datefin!:Date 
  poste!:string
  societe!:string
  description!:string
  formateur!:Formateur
}

export class Parcours
{
  id!:number
  datedeb!:Date 
  datefin!:Date 
  specialite!:string
  etablissement!:string
  formateur!:Formateur
}

export class Certification
{
  id!:number
  datedeb!:Date 
  nom!:string
  formateur!:Formateur
}
