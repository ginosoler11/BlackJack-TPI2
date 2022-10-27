import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';

@Injectable({
  providedIn: 'root',
})
export class CartaService {
  private URL: string = 'https://634892bb0b382d796c73ec11.mockapi.io/cartas/';

  constructor(private http: HttpClient) {}

  getCard(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URL);
  }
}
