import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisService } from '../../core/services/analysis.service';

import {
  ApiResponse,
  UploadAnalysisResponse,
  RepositoryAnalysisResult
} from '../../models/analysis.model';

/**
 * Componente principal de Code Insight AI.
 *
 * Responsabilidades:
 * - Permitir al usuario seleccionar un repositorio ZIP.
 * - Validar el archivo seleccionado.
 * - Enviar el repositorio al backend.
 * - Mostrar el resultado del análisis estático.
 *
 * Flujo:
 *
 * Usuario
 *   ↓
 * Selección ZIP
 *   ↓
 * Analysis
 *   ↓
 * AnalysisService
 *   ↓
 * API REST Spring Boot
 *   ↓
 * Resultado del análisis
 */
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analysis.html',
  styleUrl: './analysis.css'
})
export class Analysis {

  /**
   * Tab actualmente seleccionado en la pantalla de resultados.
   *
   * Por defecto se muestra el resumen del análisis.
   */
  activeTab = 'resumen';     

  /**
   * Archivo ZIP seleccionado por el usuario.
   */
  selectedFile: File | null = null;

  /**
   * Resultado del análisis realizado por el backend.
   */
  analysis: RepositoryAnalysisResult | null = null;
  

  /**
   * Indica si actualmente se está procesando un repositorio.
   */
  loading = false;

  /**
   * Mensaje de error mostrado al usuario.
   */
  errorMessage = '';

  /**
   * Constructor del componente.
   *
   * @param analysisService Servicio encargado de consumir
   *                         el API de análisis.
   */
constructor(
  private readonly analysisService: AnalysisService,
  private readonly changeDetectorRef: ChangeDetectorRef
) {}
    /**
     * Cambia la pestaña activa de los resultados.
     *
     * @param tab Identificador de la pestaña seleccionada.
     */
    selectTab(tab: string): void {
        console.log('Tab seleccionado:', tab);
    this.activeTab = tab;
    }
  /**
   * Captura el archivo seleccionado desde el input.
   *
   * Validaciones:
   * - Debe existir un archivo.
   * - El archivo debe tener extensión ZIP.
   *
   * @param event Evento generado por el input de tipo file.
   */
  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];

    if (!file.name.toLowerCase().endsWith('.zip')) {
      this.errorMessage = 'Solo se permiten archivos ZIP.';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
    this.analysis = null;
  }

/**
 * Envía el repositorio seleccionado al backend.
 *
 * El procesamiento se realiza mediante AnalysisService,
 * que utiliza HttpClient para consumir:
 *
 * POST /api/v1/analysis/upload
 */
analyzeRepository(): void {

  if (!this.selectedFile) {
    this.errorMessage = 'Debe seleccionar un archivo ZIP.';
    return;
  }

  this.loading = true;
  this.errorMessage = '';
  this.analysis = null;

  console.log('Enviando archivo:', this.selectedFile.name);

  this.analysisService
    .uploadRepository(this.selectedFile)
    .subscribe({

      /**
       * Respuesta exitosa del backend.
       */
        next: (response: ApiResponse<UploadAnalysisResponse>) => {

        console.log('Respuesta recibida:', response);

        if (response && response.data && response.data.analysis) {

            this.analysis = response.data.analysis;

        } else {

            this.errorMessage =
            'El backend respondió correctamente, pero no se recibió información del análisis.';
        }

        this.loading = false;

        /**
         * Fuerza la actualización de la vista después de recibir
         * la respuesta del backend.
         */
        setTimeout(() => {
        this.changeDetectorRef.detectChanges();
        }, 0);
        },

      /**
       * Error HTTP o de comunicación.
       */
      error: (error) => {

        console.error('Error al analizar repositorio:', error);

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'No fue posible analizar el repositorio.';
      },

      /**
       * Se ejecuta cuando finaliza el Observable.
       */
    complete: () => {

    console.log('Procesamiento HTTP finalizado');

    this.loading = false;
    }  

    });
}
}