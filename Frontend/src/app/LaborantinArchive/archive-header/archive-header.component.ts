import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { AjouterFilterComponent } from '../../Pharmacie/ajouter-filter/ajouter-filter.component';

@Component({
  selector: 'app-archive-header',
  imports: [AjouterFilterComponent],
  templateUrl: './archive-header.component.html',
  styleUrl: './archive-header.component.css'
})
export class ArchiveHeaderComponent {
  @Input() bilans!: BilanBio[];
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
