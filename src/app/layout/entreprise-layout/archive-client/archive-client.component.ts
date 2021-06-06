import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminEseService } from '../admin-ese.service';
import { client_entreprise } from '../employees/employees.component';

@Component({
  selector: 'app-archive-client',
  templateUrl: './archive-client.component.html',
  styleUrls: ['./archive-client.component.css']
})
export class ArchiveClientComponent implements OnInit {
  detailsClient!:client_entreprise;
  clients!:client_entreprise[];
  constructor(public serviceAdmin:AdminEseService) { }

  ngOnInit(): void {
    this.serviceAdmin.getAllClientArchive().subscribe(
      (response: client_entreprise[]) => { 
        console.log(response);
        this.clients=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(client: any, mode: string): void {
    const container:any = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   

    if (mode === 'details') {
      this.detailsClient = client;
      button.setAttribute('data-target', '#detailsClient');
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

}


