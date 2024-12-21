import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';
@Component({
  selector: 'app-recherche',
  imports: [],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {
  router = inject(Router)

  gotoajoutdpi(){
   this.router.navigate(["/ajoutdpi"]);}

}
