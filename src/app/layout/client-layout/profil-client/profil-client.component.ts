import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientPassager } from 'src/app/formations/formations.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.css']
})
export class ProfilClientComponent implements OnInit {

  userFile:any ;
  public imagePath:any;
  imgURL: any;
  public client!:ClientPassager;
  constructor(public profilService:ClientService,public fb: FormBuilder,private router: Router) { }

  get f() { return this.profilService.dataForm.controls; }

  ngOnInit(): void {

    this.profilService.getClient().subscribe(
      (response: ClientPassager) => { 
        console.log(response);
        this.client=response;
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

public onUpdateProfile( client: ClientPassager): void {
  this.profilService.updateClient(client).subscribe(
    (response: ClientPassager) => {
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
