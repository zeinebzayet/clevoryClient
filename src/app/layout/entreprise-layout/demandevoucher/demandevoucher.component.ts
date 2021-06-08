import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminEseService } from '../admin-ese.service';
import { DemandeVoucher } from '../entreprise-layout.component';

@Component({
  selector: 'app-demandevoucher',
  templateUrl: './demandevoucher.component.html',
  styleUrls: ['./demandevoucher.component.css']
})
export class DemandevoucherComponent implements OnInit {

  public demande!:DemandeVoucher[];
  constructor(public serviceAdmin:AdminEseService) { }

  ngOnInit(): void {
    this.serviceAdmin.getDemandeFormation().subscribe(
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