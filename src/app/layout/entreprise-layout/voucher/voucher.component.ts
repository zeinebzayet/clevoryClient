import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { examens } from 'src/app/examens/examens.component';
import { Formations } from 'src/app/formations/formations.component';
import { AdminEseService } from '../admin-ese.service';
import { client_entreprise, Voucher } from '../employees/employees.component';
import { demandeE } from '../examens-entreprise/examens-entreprise.component';
import { Entreprise } from '../formations-entreprise/formations-entreprise.component';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  public selectedCin!: any;
  public nb!:any;
  public nbMax!:any;
  public selectedCins!: any;

  public listCin!: any;
  @ViewChild('myForm', {static: false}) MyForm!: NgForm;

 
  
voucher!: Voucher[];
clients!:client_entreprise[];
v!:Voucher;
assignV!:Voucher;


  constructor(public serviceAdmin:AdminEseService,public fb: FormBuilder) { }

 

  ngOnInit(): void {
    this.serviceAdmin.getVoucher().subscribe(
      (response: Voucher[]) => { 
        console.log(response);
        this.voucher=response;
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }
      
    );



    /*this.serviceAdmin.getAllClient().subscribe(
      (response: client_entreprise[]) => { 
        console.log(response);
        this.clients=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );*/
  }
 

  getValues() {
    console.log(this.selectedCin);
    this.listCin=this.selectedCin;
  }

public onOpenModal(table:any,mode: string): void {
  const container:any = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');


  if (mode === 'detailsF') {

    button.setAttribute('data-target', '#detailsFormation');
    this.v=table;
  }
  if (mode === 'details') {

    button.setAttribute('data-target', '#details');
    this.v=table;
  }

  if (mode === 'assign') {

    button.setAttribute('data-target', '#assignationVoucher');
    this.assignV=table;
    this.serviceAdmin.getEmployesNonAssigne(this.assignV.code).subscribe(
      (response: client_entreprise[]) => { 
        console.log(response);
        this.clients=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
    this.nb=this.assignV.demandeVoucher.nbPlace;
    this.serviceAdmin.getNbemplyesByVoucher(this.assignV.code).subscribe(
      (response: number) => { 
        console.log(response);
        this.nbMax=this.nb-response;
        console.log(this.nbMax)
        this.ngOnInit();
        
      }
    );

  }
  container.appendChild(button);
  button.click();
}

public searchExamen(key: string): void {
  console.log(key);
  const results: Voucher[] = [];
  for (const v of this.voucher) {
    if (v.code.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    v.demandeVoucher.formation.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(v);
    }
  }
  this.voucher = results;
  if (results.length === 0 || !key) {
    this.ngOnInit();
  }
}


getList(code:string)
  {
    this.serviceAdmin.getList(code).subscribe(
      (response: client_entreprise[]) => { 
        console.log(response);
        this.clients=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

  public AssignVoucher(code:string): void{

    /*for (let i = 0; i < this.selectedCin.length; i++) {
      this.selectedCins={"cin":this.selectedCin[i]};

    }*/
    
    this.serviceAdmin.addVoucherToClient(code,this.selectedCin).subscribe(
      (response: string) => {
        console.log(response);
       
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.ngOnInit()
        
      }
    );
  }


}

 
