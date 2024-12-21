import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-ajoutdpi3',
  imports: [],
  templateUrl: './ajoutdpi3.component.html',
  styleUrl: './ajoutdpi3.component.css'
})
export class Ajoutdpi3Component {
 router = inject(Router)
 
   gotoajoutdp2(){
    this.router.navigate(["/ajoutdp2"]);}
}
