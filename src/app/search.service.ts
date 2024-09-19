// search.service.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'  // This makes the service available application-wide
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');
    searchQuery$ = this.searchSubject.asObservable();
  
    constructor(private http: HttpClient) {}
  
    updateSearchQuery(query: string) {
      this.searchSubject.next(query);
    }
  
    // Fetch cards with pagination and search query
    fetchCards(searchQuery: string = '', page: number = 1, limit: number = 6): Observable<any[]> {
      const url = new URL('https://66ebfee72b6cf2b89c5cc703.mockapi.io/api/v1/company');
      
      if (searchQuery) {
        url.searchParams.append('name', searchQuery);  // Add search query
      }
  
      url.searchParams.append('page', String(page));   // Add pagination
      url.searchParams.append('limit', String(limit)); // Add limit
  
      return this.http.get<any[]>(url.toString()).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching data:', error);
          return of([]);  // Return empty array on error
        })
      );
    }
}

