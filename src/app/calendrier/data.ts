import { DateInput } from "@fullcalendar/angular";
import { Formateur, salles } from "../formations/formations.component";


export class data{
    id!:number;
    title!:String;
    start!:DateInput;
    end!:DateInput;
    description!:String;
    prix!:number;
    supportCours!:String;
    salle!:salles;
    formateur!:Formateur;

 

  }