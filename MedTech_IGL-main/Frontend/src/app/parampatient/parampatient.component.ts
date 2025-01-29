import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-parampatient',
  imports: [],
  templateUrl: './parampatient.component.html',
  styleUrl: './parampatient.component.css'
})
export class ParampatientComponent {
  router = inject(Router)

  gotorecherche(){
   this.router.navigate(["/recherche"]);}

}
