import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-modifier-details',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modifier-details.component.html',
  styleUrl: './modifier-details.component.css'
})
export class ModifierDetailsComponent {
  notyf:Notyf | undefined;
  @Input() isVisible: boolean = false;
  @Input() label!: string;
  @Input() detail!: string;
  @Output() closePopup = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<String>>();
  detailForm: FormGroup;


  constructor(private fb: FormBuilder ,@Inject(PLATFORM_ID) private platformId: Object,private router: Router , private route: ActivatedRoute) {
    this.detailForm = this.fb.group({
    detail: ['', Validators.required] },);
        if (isPlatformBrowser(this.platformId)) {
          this.notyf = new Notyf();
        }
  }


  ngOnInit() {
    if (this.detail) {
     this.detailForm = this.fb.group({
     detail: [this.detail || '', Validators.required], // Set the initial value

      });
    }
      // Get the ID once
      this.route.params.subscribe(params => {
        const id = params['id'];
        // Use the ID to fetch data or whatever you need
      })
  }

  async onSubmit() {
    if (this.detailForm.valid) {
      const formValue = this.detailForm.value;
      const updatedData: Partial<String> = formValue.detail;
      console.log(updatedData)
      try {
        const response = await axios.put(
          "http://localhost:8000/soins/dpi/soins/65/update/",
          {description :  updatedData}
        );
        console.log(response.data);
        if (this.notyf) {
          this.notyf.success("Information sauvegardée avec succès");
        }
        this.saveChanges.emit(updatedData);
        this.closePopup.emit();
      } catch (e) {
        console.log(e);
        if (this.notyf) {
          this.notyf.error("Erreur durant la sauvegarde");
        }
      }
    }
  }
}
