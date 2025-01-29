import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-parammed',
  templateUrl: './parammed.component.html',
  styleUrls: ['./parammed.component.css'] // Le fichier CSS doit exister
})
export class ParammedComponent {
  router = inject(Router)

  gotoparampatient(){
   this.router.navigate(["/parampatient"]);}
}
