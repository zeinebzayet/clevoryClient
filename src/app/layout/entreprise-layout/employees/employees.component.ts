import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { examens } from 'src/app/examens/examens.component';
import { AdminEseService } from '../admin-ese.service';
import { demandeE } from '../examens-entreprise/examens-entreprise.component';
import { AdminEntreprise, Entreprise, Formations } from '../formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  editClient!:client_entreprise;
  deleteClient!:client_entreprise;
  detailsClient!:client_entreprise;
  c!:client_entreprise;
  clients!:client_entreprise[];
  admin!:AdminEntreprise;
  voucherexamen!:Voucher[];
  voucherformation!:Voucher[];

  constructor(public serviceAdmin:AdminEseService,private router: Router) { 

   
  }

  ngOnInit(): void {
    this.getVouchersExamen();
    this.getVouchersFormation();

    this.serviceAdmin.getAllClient().subscribe(
      (response: client_entreprise[]) => { 
        console.log(response);
        this.clients=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.serviceAdmin.getAdmin().subscribe(
      (response: AdminEntreprise) => { 
        console.log(response);
        this.admin=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
    
  }

getVouchersExamen()
{
  this.serviceAdmin.getVoucherExamen().subscribe(
    (response: Voucher[]) => { 
      console.log(response);
      this.voucherexamen=response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
}
public searchEmployee(key: string): void {
  console.log(key);
  const results: client_entreprise[] = [];
  for (const e of this.clients) {
    if (e.username.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    e.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    e.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    e.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    e.tel.toString().indexOf(key.toLowerCase()) !== -1 ||
    e.niveau.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
      results.push(e);
    }
  }
  this.clients = results;
  if (results.length === 0 || !key) {
    this.ngOnInit();
  }
}
getVouchersFormation()
{
  this.serviceAdmin.getVoucher().subscribe(
    (response: Voucher[]) => { 
      console.log(response);
      this.voucherformation=response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
}
  goToPage(pageName:string):void
  {
    this.router.navigate([`${pageName}` ]);
  }
  public onOpenModal(client: any, mode: string): void {
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClient');
    }

    if (mode === 'details') {
      this.detailsClient = client;
      button.setAttribute('data-target', '#detailsClient');
    }

    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClient');
    }

    if (mode === 'update') {
      this.editClient = client;
      button.setAttribute('data-target', '#updateClient');
    }
    if (mode === 'addvoucherformation') {
      this.c = client;
      button.setAttribute('data-target', '#addvoucherformation');
    }


    container.appendChild(button);
    button.click();
  }


  public searchClient(key: string): void {
    console.log(key);
    const results: client_entreprise[] = [];
    for (const client of this.clients) {
      if (
        client.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.tel.toLocaleString().indexOf(key.toLocaleLowerCase()) !== -1
        || client.cin.toLocaleString().indexOf(key.toLocaleLowerCase()) !== -1
        || client.poste.toLocaleString().indexOf(key.toLocaleLowerCase()) !== -1) {
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !key) {
     
    }
  }

  public onUpdateClient(cin:number,c: client_entreprise): void {
    this.serviceAdmin.updateClient(cin,c).subscribe(
      (response: client_entreprise) => {
        console.log(response);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


    public onAddClient(addForm: NgForm): void {
      this.serviceAdmin.addClient(addForm.value).subscribe
        (
          (response: client_entreprise) => {
          
            this.ngOnInit();
           
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    }


    public onDeleteClient(id: number): void {
      this.serviceAdmin.deleteClient(id).subscribe(
        (response: client_entreprise[]) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public addVoucherFormation(id:number,cin:number,addForm2: NgForm)
    {
    
      this.serviceAdmin.addVoucherFormation(id,cin,addForm2.value).subscribe
      (
        (response: AssignerVoucher) => {
        
          this.ngOnInit();
         
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    
    }


  }
  export class AssignerVoucher
  {
    voucher_id!:Voucher
    client_id!:client_entreprise
  }

  export  class client_entreprise
{
  cin!: number;
  username!: string;
  prenom!: string;
  email!: string;
  tel!: number;
  password!: string;
  adresse!: string;
  entreprise!:Entreprise
  poste!:string
  niveau!:string
  fileName!:string;

 
}

export class Voucher{
  code!:string
  demandeVoucher!:demandeE

}


