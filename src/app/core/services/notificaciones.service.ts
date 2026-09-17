import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private readonly apiUrl =
    'http://localhost:8080/api/v1/notificaciones';

  constructor(
    private readonly http: HttpClient
  ) {}

  consultarPorGuia(numeroGuia: string): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/guia/${numeroGuia}`
    );
  }
}