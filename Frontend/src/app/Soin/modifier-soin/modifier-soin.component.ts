import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Soins } from '../../../types/soins';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-soin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {
  @Input() isVisible: boolean = false;
    @Input() soin!: Soins;
    @Output() closePopup = new EventEmitter<void>();
    @Output() saveChanges = new EventEmitter<Partial<Soins>>();
    @Input() infermiers: string[] = [];
    soinForm: FormGroup;

    showEndDate: boolean = false;

    constructor(private fb: FormBuilder) {
      this.soinForm = this.fb.group({
        infermier: ['', Validators.required],
        date: ['', Validators.required],
        heure: ['en cours', Validators.required],
      });

    }

    private convertDateToInputFormat(dateStr: string): string {
      // Convert from DD/MM/YYYY to YYYY-MM-DD
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    private convertDateToDisplayFormat(dateStr: string): string {
      // Convert from YYYY-MM-DD to DD/MM/YYYY
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }


    ngOnInit() {
      if (this.soin) {
        const formattedStartDate = this.convertDateToInputFormat(this.soin.date);

        this.soinForm = this.fb.group({
          infermier: [this.soin.infermier || '', Validators.required], // Set the initial value
          date: [formattedStartDate, Validators.required],
          heure: [this.soin.heure || '', Validators.required],
        });
      }
    }

    onSubmit() {
      if (this.soinForm.valid) {
        const formValue = this.soinForm.value;

        const updatedData: Partial<Soins> = {
          infermier: formValue.infermier,
          date: this.convertDateToDisplayFormat(formValue.date),
          heure: formValue.heure,
        };
        this.saveChanges.emit(updatedData);
      }
    }
}
