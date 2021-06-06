import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEntreprise } from '../formations-entreprise/formations-entreprise.component';
import { ProfilAdminService } from './profil-admin.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {

  userFile:any ;
  public imagePath:any;
  imgURL: any;
  public admin!:AdminEntreprise;
  constructor(public profilService:ProfilAdminService,public fb: FormBuilder,private router: Router) { }

  get f() { return this.profilService.dataForm.controls; }

  ngOnInit(): void {

    this.profilService.getAdminByCin().subscribe(
      (response: AdminEntreprise) => { 
        console.log(response);
        this.admin=response;
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

public onUpdateProfile( admin: AdminEntreprise): void {
  this.profilService.updateAdmin(admin).subscribe(
    (response: AdminEntreprise) => {
      console.log(response);
      this.ngOnInit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }


  );
}

public onOpenModal(mode: string): void {
  const container:any = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');




  if (mode === 'add') {
    //this.updatePersonne=personne;
    button.setAttribute('data-target', '#addPhoto');
  }

  container.appendChild(button);
  button.click();
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

}
