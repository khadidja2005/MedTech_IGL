import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { AjouterFilterComponent } from "../ajouter-filter/ajouter-filter.component";
@Component({
  selector: 'app-pharma-header',
  imports: [AjouterFilterComponent],
  templateUrl: './pharma-header.component.html',
  styleUrl: './pharma-header.component.css'
})
export class PharmaHeaderComponent {
  @Input() ordonnances!: Ordonnance[];
  filledFieldsCount: number = 0;
  @Output() applyFilter = new EventEmitter<any>(); // Add this output


  isAddPanelVisible = false;
  isPopupVisible = false;

  onFilterApply(filterValues: any) {
    this.applyFilter.emit(filterValues);
  }

  updateFilledCount(count: number) {
    this.filledFieldsCount = count;
  }



  openAddPanel() {
        this.isAddPanelVisible = true;
    }

      // Method to close the panel
      closeAddPanel() {
        this.isAddPanelVisible = false;
      }

      openPopup() {
        this.isPopupVisible = true;
      }

      closePopup() {
        this.isPopupVisible = false;
      }
}

