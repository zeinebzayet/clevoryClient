import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Voucher } from '../../entreprise-layout/employees/employees.component';
import { ClientEseService } from '../client-ese.service';

@Component({
  selector: 'app-mesvoucherexamen',
  templateUrl: './mesvoucherexamen.component.html',
  styleUrls: ['./mesvoucherexamen.component.css']
})
export class MesvoucherexamenComponent implements OnInit {

  public voucherF !:Voucher[]
  details!:Voucher;


  constructor(public profilService:ClientEseService) { }

  ngOnInit(): void {
    this.profilService.getVoucherexamen().subscribe(
      (response: Voucher[]) => { 
        console.log(response);
        this.voucherF=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(table:any, mode: string): void {
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'details') {
      this.details = table;
      button.setAttribute('data-target', '#detailsCours');
    }
    container.appendChild(button);
    button.click();

}

public searchExamen(key: string): void {
  console.log(key);
  const results: Voucher[] = [];
  for (const v of this.voucherF) {
    if (v.code.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
    v.demandeVoucher.examen.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(v);
    }
  }
  this.voucherF = results;
  if (results.length === 0 || !key) {
    this.ngOnInit();
  }
}

}
