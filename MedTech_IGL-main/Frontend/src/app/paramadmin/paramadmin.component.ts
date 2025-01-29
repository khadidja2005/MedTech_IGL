import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-paramadmin',
  templateUrl: './paramadmin.component.html' ,

  styleUrls: ['./paramadmin.component.css'], 
})
export class ParamadminComponent {
  router = inject(Router)

  gotoparammed(){
   this.router.navigate(["/parammed"]);}

}
