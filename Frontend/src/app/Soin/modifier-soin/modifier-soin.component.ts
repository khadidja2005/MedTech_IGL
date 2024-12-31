import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Infermier, Soin } from '../soin/soin.component';

@Component({
  selector: 'app-modifier-soin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {
  @Input() isVisible: boolean = false;
    @Input() soin!: Soin;
    @Output() closePopup = new EventEmitter<void>();
    @Output() saveChanges = new EventEmitter<Partial<Soin>>();
    @Input() infermiers: Infermier[] = [];
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

    getInfermierName(infermierId: number): string {
      const infermier = this.infermiers.find(i => i.id === infermierId);
      return infermier ? infermier.nom : 'Unknown Infermier';
    }


    ngOnInit() {
      if (this.soin) {
        const formattedStartDate = this.convertDateToInputFormat(this.soin.date);

        this.soinForm = this.fb.group({
          infermier: [this.soin.infermier, Validators.required], // Use ID
          date: [formattedStartDate, Validators.required],
          heure: [this.soin.heure || '', Validators.required],
        });
      }
    }

    onSubmit() {
      if (this.soinForm.valid) {
        const formValue = this.soinForm.value;

        const updatedData: Partial<Soin> = {
          infermier: formValue.infermier, // Send the ID
          date: this.convertDateToDisplayFormat(formValue.date),
          heure: formValue.heure,
        };

        this.saveChanges.emit(updatedData);
        this.closePopup.emit(); // Close the popup after submission
      }
    }

}
