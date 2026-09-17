import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/guias';

  constructor(
    private readonly http: HttpClient
  ) {}

  crearGuia(numeroGuia: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      {
        numeroGuia: numeroGuia
      }
    );
  }

  consultarGuia(numeroGuia: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${numeroGuia}`
    );
  }

  cambiarEstado(
    numeroGuia: string,
    estado: string,
    usuarioId: string,
    origen: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${numeroGuia}/estado`,
      {
        estado: estado,
        usuarioId: usuarioId,
        origen: origen
      }
    );
  }

  consultarHistorial(numeroGuia: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${numeroGuia}/historial`
    );
  }
}

