import { Component } from '@angular/core';

interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  authorTitle: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 'left',
      text: 'Karl really kept the team together with his great organization and clear communication. We wouldn\'t have got this far without his commitment.',
      authorName: 'Tobias Lange',
      authorTitle: 'Frontend Developer'
    },
    {
      id: 'center',
      text: 'It\'s always a pleasure to work with Karl. He knows how to motivate and encourage team members to achieve the best work possible, always adding a personal brainstorm. Regarding the well-being of his team members, he was always present and ready to listen and help others, with a great sense of humor as well.',
      authorName: 'Anna Developer', 
      authorTitle: 'Backend Developer'
    },
    {
      id: 'right',
      text: 'Karl is a great team colleague at DA. His positive attitude and willingness to take on challenges made a significant contribution to us achieving our goals.',
      authorName: 'Max Schmidt',
      authorTitle: 'Project Manager'
    }
  ];
}