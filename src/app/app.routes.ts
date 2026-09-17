import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios').then(m => m.Usuarios)
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos').then(m => m.Productos)
  },

   /**
   * Pantalla principal de Code Insight AI.
   *
   * Permite cargar un repositorio ZIP y visualizar
   * el resultado del análisis estático.
   */
  {
    path: 'analysis',
    loadComponent: () =>
      import('./pages/analysis/analysis').then(m => m.Analysis)
  },

  // TCC - Gestión de Guías
  {
    path: 'guias',
    loadComponent: () =>
      import('./pages/guias/guias').then(m => m.Guias)
  },

  {
  path: 'notificaciones',
  loadComponent: () =>
    import('./pages/notificaciones/notificaciones')
      .then(m => m.Notificaciones)
}

];