import { Component } from '@angular/core';
import { SearchService } from '../../search.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    constructor(private searchService: SearchService) {}

    // Method to handle the input event
    onSearch(event: Event): void {
      const inputElement = event.target as HTMLInputElement;  // Cast event target to HTMLInputElement
      const query = inputElement?.value || '';  // Safely access the value or set to empty string if null
      this.searchService.updateSearchQuery(query);  // Update the search query in the service
    }
}
