import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-ajoutdpi',
  imports: [],
  templateUrl: './ajoutdpi.component.html',
  styleUrl: './ajoutdpi.component.css'
})
export class AjoutdpiComponent {
  router = inject(Router)

  gotoajoutdp2(){
   this.router.navigate(["/ajoutdp2"]);}
   gotorecherche(){
    this.router.navigate(["/recherche"]);}

}
