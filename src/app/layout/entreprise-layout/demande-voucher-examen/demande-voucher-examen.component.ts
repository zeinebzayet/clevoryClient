import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminEseService } from '../admin-ese.service';
import { DemandeVoucher } from '../entreprise-layout.component';

@Component({
  selector: 'app-demande-voucher-examen',
  templateUrl: './demande-voucher-examen.component.html',
  styleUrls: ['./demande-voucher-examen.component.css']
})
export class DemandeVoucherExamenComponent implements OnInit {

  demande!:DemandeVoucher[];
  constructor(public serviceAdmin:AdminEseService) { }

  ngOnInit(): void {
    this.serviceAdmin.getDemandeExamen().subscribe(
      (response: DemandeVoucher[]) => { 
        console.log(response);
        this.demande=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  }
