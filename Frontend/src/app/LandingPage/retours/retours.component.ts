import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-retours',
  imports: [CommonModule],
  templateUrl: './retours.component.html',
  styleUrl: './retours.component.css'
})
export class RetoursComponent {

  reviews = [
    {
      name: "Dr. Amina Benali",
      job: "Cardiologue",
      feedback: "Grâce à Medtech, la gestion des dossiers de mes patients est devenue beaucoup plus simple et rapide. Je peux accéder à toutes les informations nécessaires en quelques clics, ce qui me permet de me concentrer sur ce qui compte vraiment : offrir les meilleurs soins possibles.",
      image: "assets/images/doctor.png"
    },
    {
      name: "Dr. Karim Boudjema",
      job: "Généraliste",
      feedback: "Medtech a vraiment changé ma pratique quotidienne. Je peux retrouver facilement les antécédents de mes patients et assurer un meilleur suivi médical.",
      image: "assets/images/doctor.png"
    },
    {
      name: "Dr. Yasmina Salah",
      job: "Dermatologue",
      feedback: "Une plateforme intuitive qui a simplifié la gestion de mes consultations et m'a permis de gagner un temps précieux.",
      image: "assets/images/doctor.png"
    },
    {
      name: "Dr. Farid Mellah",
      job: "Pédiatre",
      feedback: "Avec Medtech, je peux enfin me concentrer sur mes patients au lieu de perdre du temps dans des tâches administratives fastidieuses.",
      image: "assets/images/doctor.png"
    },
  ];

}
