import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { AjouterFilterComponent } from '../../Pharmacie/ajouter-filter/ajouter-filter.component';
import { BilanLabo } from '../../Laborantin/laborantin/laborantin.component';

@Component({
  selector: 'app-archive-header',
  imports: [AjouterFilterComponent],
  templateUrl: './archive-header.component.html',
  styleUrl: './archive-header.component.css'
})
export class ArchiveHeaderComponent {
  @Input() bilans!: BilanLabo[];
      filledFieldsCount: number = 0;
      @Output() applyFilter = new EventEmitter<any>(); // Add this output
      @Output() resetFilter = new EventEmitter<void>();


  isAddPanelVisible = false;
  isPopupVisible = false;

  onReset() {
    this.filledFieldsCount = 0;
    this.resetFilter.emit();
  }

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
