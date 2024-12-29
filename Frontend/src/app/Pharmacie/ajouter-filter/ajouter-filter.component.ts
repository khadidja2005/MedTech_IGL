import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-filter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-filter.component.html',
  styleUrls: ['./ajouter-filter.component.css']
})
export class AjouterFilterComponent {
  @Input() isVisible: boolean = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() filledFieldsCountChange = new EventEmitter<number>();
  @Output() applyFilter = new EventEmitter<any>();
  @Input() set shouldReset(value: boolean) {
    if (value) {
      this.filterForm.reset();
    }
  }

  filterForm: FormGroup;
  filledFieldsCount: number = 0; // To persist the count

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      date_debut: [''],
      date_fin: [''],
      etablissement: ['']
    });

    // Update filled fields count whenever form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.updateFilledFieldsCount();
    });
  }
  closesPanel() {
    this.isVisible = false;
  }

  // Count the number of fields with non-empty values
  private updateFilledFieldsCount() {
    const filledCount = Object.values(this.filterForm.value).filter(value => !!value).length;
    this.filledFieldsCount = filledCount; // Persist the count
    this.filledFieldsCountChange.emit(filledCount);
  }
  private convertDateToDisplayFormat(dateStr: string): string {
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  onSubmit() {
    // Perform form submission logic here
    const filterValues = this.filterForm.value;
    filterValues.date_debut=this.convertDateToDisplayFormat(filterValues.date_debut);
    filterValues.date_fin=this.convertDateToDisplayFormat(filterValues.date_fin);

    // Emit the filter values
    this.applyFilter.emit(filterValues);

    // Emit the current count before resetting
    this.filledFieldsCountChange.emit(this.filledFieldsCount);

    // Close the panel
    this.closePanel.emit();
  }
}
