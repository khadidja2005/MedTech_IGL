import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-modifier-details',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modifier-details.component.html',
  styleUrl: './modifier-details.component.css'
})
export class ModifierDetailsComponent {
  @Input() isVisible: boolean = false;
      @Input() label!: string;
      @Input() detail!: string;
      @Output() closePopup = new EventEmitter<void>();
      @Output() saveChanges = new EventEmitter<Partial<String>>();
      detailForm: FormGroup;


      constructor(private fb: FormBuilder) {
        this.detailForm = this.fb.group({
          detail: ['', Validators.required],

        });

      }


      ngOnInit() {
        if (this.detail) {
          this.detailForm = this.fb.group({
            detail: [this.detail || '', Validators.required], // Set the initial value

          });
        }
      }

      onSubmit() {
        if (this.detailForm.valid) {
          const formValue = this.detailForm.value;
          const updatedData: Partial<String> = formValue.detail;
          this.saveChanges.emit(updatedData);
        }
      }
}
