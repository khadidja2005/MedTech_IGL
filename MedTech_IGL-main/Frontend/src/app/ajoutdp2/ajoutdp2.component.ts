import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-ajoutdp2',
  imports: [],
  templateUrl: './ajoutdp2.component.html',
  styleUrl: './ajoutdp2.component.css'
})
export class Ajoutdp2Component {
  router = inject(Router)

  gotoajoutdpi3(){
   this.router.navigate(["/ajoutdpi3"]);}
   gotorecherche(){
    this.router.navigate(["/recherche"]);}
}
