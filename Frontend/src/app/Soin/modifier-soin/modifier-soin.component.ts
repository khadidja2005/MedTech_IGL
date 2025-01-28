import { Component, Input, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Infermier, Soin } from '../soin/soin.component';
import { Notyf } from 'notyf';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-soin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent {
  notyf: Notyf | undefined;
  @Input() isVisible: boolean = false;
  @Input() soin!: Soin;
  @Output() closePopup = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<Soin>>();
  @Input() infermiers: Infermier[] = [];
  soinForm: FormGroup;
  showEndDate: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router , 
    private route: ActivatedRoute
  ) {
    this.soinForm = this.fb.group({
      infermier: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['en cours', Validators.required],
      medicament: [''], // Added medicament field
      dose: [''],      // Added dose field
    });

    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }

  private convertDateToInputFormat(dateStr: string): string {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  private convertDateToDisplayFormat(dateStr: string): string {
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
        infermier: [this.soin.infermier, Validators.required],
        date: [formattedStartDate, Validators.required],
        heure: [this.soin.heure || '', Validators.required],
        medicament: [this.soin.medicament || ''], // Initialize with existing value or empty string
        dose: [this.soin.dose || ''],           // Initialize with existing value or empty string
      });
    }
        // Get the ID once
        this.route.params.subscribe(params => {
          const id = params['id'];
          // Use the ID to fetch data or whatever you need
        });
  }

  async onSubmit() {
    if (this.soinForm.valid) {
      const formValue = this.soinForm.value;

      // Keep the date in YYYY-MM-DD format for the backend
      const updatedData: Partial<Soin> = {
        infermier: formValue.infermier,
        date: formValue.date, // Don't convert to DD/MM/YYYY
        heure: formValue.heure,
        medicament: formValue.medicament || 'None', // Provide default value if empty
        dose: formValue.dose || 'None',           // Provide default value if empty
      };

      try {
        const response = await axios.put(
          "http://localhost:8000/soins/dpi/soins/65/update/",
          updatedData
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