

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { Formateur,salles } from '../formations/formations.component';

import { CalendrierService } from './calendrier.service';

import { data } from './data';



@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})


export class CalendrierComponent implements OnInit {

 

  public salles: any;
  public formateurs: any;

  datedeb: any;
  zz: any;
  value: any;
  date1: any;

  Libele: any;
  public test: number = 0;

  date2: any;
  options: any;
  calendarOptions!: CalendarOptions;
  events: any[] = [];
  X: any;


  FormationForm = new FormGroup({
    libelle: new FormControl(),
    description: new FormControl(),
    datedeb: new FormControl(),
    datefin: new FormControl(),
    support_cours: new FormControl(),
    prix: new FormControl(),
    salle: new FormGroup({
      id: new FormControl()
    }),
    formateur: new FormGroup({
      cin: new FormControl()
    })
  });


  addFormationForm = new FormGroup({
    libelle: new FormControl(),
    description1: new FormControl(),
    datedeb: new FormControl(),
    datefin: new FormControl(),
    support_cours: new FormControl(),
    prix: new FormControl()
  });

  constructor(private formationService: CalendrierService) { }


  ngOnInit() {



    let Op1 = async () => {

      this.formationService.getAllFormations().subscribe(TESTDATA => {
        console.log(TESTDATA)
        console.log("1")

        for (let i = 0; i < TESTDATA.length; i++) {
          let E: data = new data();

          console.log("i=" + i);
          let id: number;
          let title = "";
          let dateX: any;
          let dateY: any;
          let description = "";
          let cours = "";
          let salle: salles;
          let formateur: Formateur;
          let prix: number;

          id = TESTDATA[i]["id"];
          title = TESTDATA[i]["libelle"];
          dateX = TESTDATA[i]["datedeb"];
          dateY = TESTDATA[i]["datefin"];
          description = TESTDATA[i]["description"];
          cours = TESTDATA[i]["support_cours"];
          prix = TESTDATA[i]["prix"];
          salle = TESTDATA[i]["salle"];
          formateur = TESTDATA[i]["formateur"];
          dateY = dateY + " 20:00:00";
          E.id = id, E.title = title, E.start = dateX, E.end = dateY, E.description = description, E.supportCours = cours, E.prix = prix, E.salle = salle, E.formateur = formateur
          this.events.push(E);
          console.log(E.id)
          console.log(this.events)



        }


        this.calendarOptions.events = this.events
        for (let j = 0; j < this.calendarOptions.events.length; j++) {
          this.calendarOptions.events[j].color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        console.log(this.test)
        console.log("**************************")
        console.log(this.calendarOptions.events)
      })







    }




    let Op2 = async () => {
      console.log("3")
      await new Promise(((resolve, reject) => {
        resolve(Op1())
      })).then((value1 => {


        this.calendarOptions = {

          //plugins: [ bootstrapPlugin ],
          //themeSystem: 'bootstrap',
         
          locale:'fr',
          editable:true,
          initialView: 'dayGridMonth,listMonth',
          displayEventTime: false,
          dayMaxEvents: true,
          //dateClick: this.handleDateClick.bind(this),
          headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
          },
      
          /* select: function (info) {
               let d=formatDate(info.endStr);
               d.concat("T23:59:00");
               
               console.log(d);
               let d2=d+" 20:00:00";
               console.log(d2);
               alert('selected ' + info.startStr  + ' to ' + d);
             
             },
   
              let did: HTMLInputElement = document.getElementById('datedeb') as HTMLInputElement;
              did.setAttribute("value", info.startStr);
   
              let dido: HTMLInputElement = document.getElementById('datefin') as HTMLInputElement;
              dido.setAttribute("value", info.endStr);
   
   
            },*/


          eventClick: function (info) {

            info.jsEvent.preventDefault();

            console.log(info.event.id)

            const container:any = document.getElementById('main-container');
            const button = document.createElement('button');
            button.type = 'button';
            button.style.display = 'none';
            button.setAttribute('data-toggle', 'modal');

            let id1: HTMLInputElement = document.getElementById('id') as HTMLInputElement;
            id1.setAttribute("value", info.event.id)

            let lib: HTMLInputElement = document.getElementById('libelle1') as HTMLInputElement;
            lib.setAttribute("value", info.event.title)
            console.log(info.event.title)


            //console.log(formatDate(info.event.start.toISOString()));
            //let df: any = info.event.end.toLocaleDateString('en-CA');
            //let dd: any = info.event.start.toLocaleDateString('en-CA')

            let ds!: any;
            ds=info.event.start;
            let df!:any;
            df=info.event.end;

            let dateD: HTMLInputElement = document.getElementById('datedeb1') as HTMLInputElement;
            dateD.setAttribute("value", formatDate(ds));

            let dateF: HTMLInputElement = document.getElementById('datefin1') as HTMLInputElement;
            dateF.setAttribute("value", formatDate(df));

            //console.log(info.event.end.toLocaleDateString('en-CA'));


            /*let dateD: HTMLInputElement = document.getElementById('datedeb1') as HTMLInputElement;
            dateD.setAttribute("value", formatDate(info.event.start));




            let dateF: HTMLInputElement = document.getElementById('datefin1') as HTMLInputElement;
            dateF.setAttribute("value", formatDate(info.event.end));
            console.log(info.event.end.toLocaleDateString('en-CA'));*/




            let specialite2: HTMLInputElement = document.getElementById('description1') as HTMLInputElement;
            specialite2.setAttribute("value", info.event._def.extendedProps.description)

            let prix2: HTMLInputElement = document.getElementById('prix1') as HTMLInputElement;
            prix2.setAttribute("value", info.event._def.extendedProps.prix)

           





            console.log(info.event._def.extendedProps)


            console.log(id1)

            button.setAttribute('data-target', '#updateFormation');
            container.appendChild(button);
            button.click();



            



          }


        }
      }))


    }

    Op2();


    this.formationService.getAllSalle().subscribe(
      (response: salles[]) => {
        console.log(response);
        this.salles = response;

      });

    this.formationService.getAllFormateur().subscribe(
      (response: Formateur[]) => {
        console.log(response);
        this.formateurs = response;


      });


  }


  //********************Function select date  */

  /*handleDateClick(arg) {

    console.log("hi");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    button.setAttribute('data-target', '#addModal');
    container.appendChild(button);
    button.click();

    this.datedeb = arg.dateStr;
    console.log(this.datedeb);

  }*/








 


}





function formatDate(Dat:  Date) {
  var d = new Date(Dat),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}


