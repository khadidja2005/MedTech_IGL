import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-code',
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  router = inject(Router)

  gotosauvegarde(){
   this.router.navigate(["/sauvegarde"]);
   
  }
}
