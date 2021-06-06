import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendrierService } from 'src/app/calendrier/calendrier.service';
import { data } from 'src/app/calendrier/data';
import { Formateur, salles } from 'src/app/formations/formations.component';
import { EmploiService } from './emploi.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
  public salles!: salles[];
  calendarOptions!: CalendarOptions;
  events: any[] = [];

  constructor(private emploiService: EmploiService,private calendar: CalendrierService,private router: Router) { }

  goToPage1(pageName:string,id:number):void
  {
    this.router.navigate([`${pageName}` ],{queryParams:{formation:`${id}`}});
  }

  ngOnInit(): void {

    let Op1 = async () => {

      this.emploiService.getformationByFormateur().subscribe(TESTDATA => {
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
        
          let prix: number;

          id = TESTDATA[i]["id"];
          title = TESTDATA[i]["libelle"];
          dateX = TESTDATA[i]["datedeb"];
          dateY = TESTDATA[i]["datefin"];
          description = TESTDATA[i]["description"];
          cours = TESTDATA[i]["support_cours"];
          prix = TESTDATA[i]["prix"];
          salle = TESTDATA[i]["salle"];
       
          dateY = dateY + " 20:00:00";
          E.id = id, E.title = title, E.start = dateX, E.end = dateY, E.description = description, E.supportCours = cours, E.prix = prix, E.salle = salle
          this.events.push(E);
          console.log(E.id)
         // console.log(this.events)



        }


        this.calendarOptions.events = this.events
        for (let j = 0; j < this.calendarOptions.events.length; j++) {
          this.calendarOptions.events[j].color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        //console.log(this.test)
        console.log("**************************")
        //console.log(this.calendarOptions.events)
      })







    }




    let Op2 = async () => {
      console.log("3")
      await new Promise(((resolve, reject) => {
        resolve(Op1())
      })).then((value1 => {


        this.calendarOptions = {


          themeSystem: 'bootstrap',
          //plugins: [ bootstrapPlugin ],
          locale: 'fr',
          initialView: 'dayGridMonth,listMonth,dayGridWeek',
          displayEventTime: false,
          weekNumbers: true,
          navLinks: true,
          dayMaxEvents: true,

          
          //dateClick: this.handleDateClick.bind(this),
          headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridDay,dayGridWeek,listMonth'
          },
          eventClick: this.handEventClick.bind(this)
         
         

        }
      }))


    }

    Op2();


    this.calendar.getAllSalle().subscribe(
      (response: salles[]) => {
        console.log(response);
        this.salles = response;

      });








  
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    
  }





  handEventClick(arg:any) {

    arg.jsEvent.preventDefault();

    this.goToPage1('detailsformation',arg.event.id)

   
            
    /*info.jsEvent.preventDefault();

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
    console.log(info.event.end.toLocaleDateString('en-CA'));




    let specialite2: HTMLInputElement = document.getElementById('description1') as HTMLInputElement;
    specialite2.setAttribute("value", info.event._def.extendedProps.description)

    let prix2: HTMLInputElement = document.getElementById('prix1') as HTMLInputElement;
    prix2.setAttribute("value", info.event._def.extendedProps.prix)

    let salle2: HTMLInputElement = document.getElementById('sallefr') as HTMLInputElement;
    salle2.setAttribute("value", info.event._def.extendedProps.salle.nom)

    console.log(info.event._def.extendedProps.salle.nom)



    console.log(info.event._def.extendedProps)


    console.log(id1)

    button.setAttribute('data-target', '#updateFormation');
    container.appendChild(button);
    button.click();*/




  }
}








function formatDate(Dat: string | number | Date) {
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
