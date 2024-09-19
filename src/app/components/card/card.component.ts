import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { SearchService } from '../../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    cards: any[] = [];
    isLoading = true;  // Loading state
    noProducts = false;  // State for no products

    currentPage = 1;  // Track current page
    totalPages = 1;   // Track total number of pages
    limit = 6; 

    allLoaded = false;       // All products loaded state

  
    constructor(private http: HttpClient, private searchService: SearchService,private router: Router) {
        // Subscribe to search query changes and call the API
        this.searchService.searchQuery$
          .pipe(
            switchMap(query => {
              this.isLoading = true;  // Set loading state to true before fetching
              this.cards = [];        // Reset cards when search query changes
              this.currentPage = 1;   // Reset page when search query changes
              this.allLoaded = false; // Reset allLoaded when starting a new search
              return this.searchService.fetchCards(query, this.currentPage, this.limit);
            })
          )
          .subscribe((data: any[]) => {
            this.isLoading = false;  // Set loading state to false after fetching
            this.cards = data;
            this.noProducts = data.length === 0;  // Check if there are no products
            if (data.length < this.limit) {
              this.allLoaded = true;  // If fewer items are returned, all are loaded
            } else {
              this.currentPage++; // Increment page for subsequent loads
            }
          });
      }

      // Method to navigate to the card details page when "Buy Now" is clicked
  goToDetails(cardId: number) {
    this.router.navigate(['/card', cardId]);  // Navigate to /card/:id
  }

    
      // Load more cards based on the current page and limit
      loadMoreCards() {
        this.isLoading = true;
        
        // Fetch cards based on the current search query, page, and limit
        this.searchService.fetchCards('', this.currentPage, this.limit)
          .subscribe((data: any[]) => {
            this.isLoading = false;
            if (data.length > 0) {
              this.cards = [...this.cards, ...data]; // Append new products to the existing array
              this.currentPage++; // Increment page for the next batch
            }
            if (data.length < this.limit) {
              // If fewer products are returned, it means we've loaded all available products
              this.allLoaded = true;
            }
          });
      }
}
