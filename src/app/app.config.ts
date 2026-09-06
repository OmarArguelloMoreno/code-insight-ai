import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación Angular.
 *
 * En esta configuración se registran los proveedores globales
 * utilizados por la aplicación.
 */
export const appConfig: ApplicationConfig = {

  providers: [

    /**
     * Configuración del sistema de navegación de Angular.
     */
    provideRouter(routes),

    /**
     * Habilita HttpClient para realizar peticiones HTTP.
     *
     * Es utilizado por los servicios de la aplicación para
     * comunicarse con el backend REST desarrollado con Spring Boot.
     *
     * Flujo:
     *
     * Componente Angular
     *       ↓
     * AnalysisService
     *       ↓
     * HttpClient
     *       ↓
     * Spring Boot API
     */
    provideHttpClient()
  ]
};