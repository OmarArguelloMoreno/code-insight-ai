import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ApiResponse,
  UploadAnalysisResponse
} from '../../models/analysis.model';

/**
 * Servicio encargado de la comunicación entre el frontend Angular
 * y el backend de Code Insight AI.
 *
 * Actualmente permite enviar un repositorio en formato ZIP al backend
 * para realizar su análisis estático.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  /**
   * URL base del API REST desarrollado con Spring Boot.
   */
  private readonly apiUrl =
    'http://localhost:8080/api/v1/analysis';

  /**
   * Inyección del cliente HTTP de Angular.
   *
   * HttpClient permite realizar peticiones HTTP hacia el backend.
   */
  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Envía un archivo ZIP al backend para analizar el repositorio.
   *
   * El archivo se envía utilizando FormData debido a que el endpoint
   * de Spring Boot recibe un MultipartFile.
   *
   * Flujo:
   *
   * Frontend Angular
   *      ↓
   * FormData
   *      ↓
   * POST /api/v1/analysis/upload
   *      ↓
   * Backend Spring Boot
   *      ↓
   * Análisis del repositorio
   *      ↓
   * Resultado del análisis
   *
   * @param file Archivo ZIP seleccionado por el usuario.
   *
   * @returns Observable con la respuesta generada por el backend,
   * incluyendo la información del análisis del repositorio.
   */
  uploadRepository(
    file: File
  ): Observable<ApiResponse<UploadAnalysisResponse>> {

    /**
     * FormData permite enviar archivos mediante
     * multipart/form-data.
     */
    const formData = new FormData();

    /**
     * Se agrega el archivo con el nombre "file".
     *
     * Este nombre debe coincidir con el parámetro esperado
     * por el backend:
     *
     * @RequestParam("file") MultipartFile file
     */
    formData.append('file', file);

    /**
     * Se realiza una petición POST al endpoint del backend.
     *
     * URL final:
     *
     * http://localhost:8080/api/v1/analysis/upload
     */
    return this.http.post<
      ApiResponse<UploadAnalysisResponse>
    >(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}