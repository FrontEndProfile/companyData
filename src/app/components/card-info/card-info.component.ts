import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
    card: any;  // Variable to store card details

    constructor(private route: ActivatedRoute, private http: HttpClient) {}
  
    ngOnInit(): void {
      // Get the card ID from the route parameters
      const cardId = this.route.snapshot.paramMap.get('id');
      
      // Fetch the card details using the ID
      this.http.get(`https://66ebfee72b6cf2b89c5cc703.mockapi.io/api/v1/company/${cardId}`)
        .subscribe((data: any) => {
          this.card = data;  // Store the card details
        });
    }
}
