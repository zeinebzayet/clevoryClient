import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminEseService } from '../admin-ese.service';
import { client_entreprise, Voucher } from '../employees/employees.component';

@Component({
  selector: 'app-voucherexamen',
  templateUrl: './voucherexamen.component.html',
  styleUrls: ['./voucherexamen.component.css']
})
export class VoucherexamenComponent implements OnInit {

  voucher!: Voucher[];
  clients!: client_entreprise[];
  v!: Voucher;
  public nbMax!: any;
  public selectedCin!: any;
  public nb!: any;
  public selectedCins!: any;
  assignV!: Voucher;
  constructor(public serviceAdmin: AdminEseService) { }

  ngOnInit(): void {
    this.serviceAdmin.getVoucherExamen().subscribe(
      (response: Voucher[]) => {
        console.log(response);
        this.voucher = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );


    /*this.serviceAdmin.getAllClient().subscribe(
      (response: client_entreprise[]) => {
        console.log(response);
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );*/

  }

  getList(code: string) {
    this.serviceAdmin.getList(code).subscribe(
      (response: client_entreprise[]) => {
        console.log(response);
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getValues() {
    console.log(this.selectedCin);

  }

  public onOpenModal(table: any, mode: string): void {
    const container: any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'details') {

      button.setAttribute('data-target', '#details');
      this.v = table;

    }
    if (mode === 'assign') {

      button.setAttribute('data-target', '#assignationVoucher');
      this.assignV = table;
      this.serviceAdmin.getEmployesNonAssigne(this.assignV.code).subscribe(
        (response: client_entreprise[]) => {
          console.log(response);
          this.clients = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.nb = this.assignV.demandeVoucher.nbPlace;
      this.serviceAdmin.getNbemplyesByVoucher(this.assignV.code).subscribe(
        (response: number) => {
          console.log(response);
          this.nbMax = this.nb - response;
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
        v.demandeVoucher.examen.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(v);
      }
    }
    this.voucher = results;
    if (results.length === 0 || !key) {
      this.ngOnInit();
    }
  }

  public AssignVoucher(code: string): void {

    this.serviceAdmin.addVoucherToClient(code, this.selectedCin).subscribe(
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