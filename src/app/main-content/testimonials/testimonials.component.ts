import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  authorTitle: string;
  linkedinUrl: string; 
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 'left',
      text: 'Es hat mir viel Spaß gemacht mit Mirkan am Projekt Kochwelt zu arbeiten. Er war sehr Engagiert und fokussiert.  Seine Ideen waren eine großes Hilfe für das Team. Ich würde auf jeden Fall wieder mit Ihm an einem Projekt arbeiten. Vielen Danke noch einmal.',
      authorName: 'Markus Fischer',
      authorTitle: 'Frontend Developer',
      linkedinUrl: 'https://www.linkedin.com/in/markus-fischer/'
    },
    {
      id: 'center',
      text: 'Mirkan beeindruckt mich auch nach Monaten noch mit seiner Energie und Ausdauer. In unserem Projekt war er jederzeit bereit, mitanzupacken, sogar spät abends, wenn’s mal stressig wurde. Dabei blieb er immer positiv, offen und hat mit seiner Art das Teamgefühl gestärkt',
      authorName: 'Simon Fuchs', 
      authorTitle: 'Frontend Developer',
      linkedinUrl: 'https://www.linkedin.com/in/simon-fuchs/'
    },
    {
      id: 'right',
      text: 'Karl is a great team colleague at DA. His positive attitude and willingness to take on challenges made a significant contribution to us achieving our goals.',
      authorName: 'Max Schmidt',
      authorTitle: 'Project Manager',
      linkedinUrl: 'https://www.linkedin.com/in/max-schmidt/'
    }
  ];
}