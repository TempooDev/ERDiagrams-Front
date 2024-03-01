import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiagramsService {
  private http = inject(HttpClient)

  getDiagrams() {
    const url = 'https://af-erdiagram.azurewebsites.net/api/diagrams'
    return this.http.get(url).pipe();
  }
}
