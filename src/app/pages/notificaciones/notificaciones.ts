import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificacionesService } from '../../core/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones {

  numeroGuia = '';

  notificaciones: any[] = [];

  mensaje = '';
  tipoMensaje = '';

  constructor(
    private readonly notificacionesService: NotificacionesService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  consultar(): void {

    const numero = this.numeroGuia.trim();

    if (!numero) {

      this.mensaje = 'Ingrese un número de guía';
      this.tipoMensaje = 'error';
      this.notificaciones = [];

      this.cdr.detectChanges();
      return;
    }

    this.mensaje = '';
    this.notificaciones = [];

    this.notificacionesService
      .consultarPorGuia(numero)
      .subscribe({

      next: (response) => {

        console.log('Notificaciones recibidas:', response);

        this.notificaciones = [...response];

        this.mensaje =
          response.length > 0
            ? 'Notificaciones encontradas'
            : 'La guía no tiene notificaciones';

        this.tipoMensaje =
          response.length > 0
            ? 'success'
            : 'info';

        this.cdr.detectChanges();
      },

        error: (error) => {

          console.error(
            'Error consultando notificaciones:',
            error
          );

          this.notificaciones = [];

          this.mensaje =
            'No fue posible consultar las notificaciones';

          this.tipoMensaje = 'error';

          this.cdr.detectChanges();
        }
      });
  }

  limpiar(): void {

    this.numeroGuia = '';
    this.notificaciones = [];
    this.mensaje = '';
    this.tipoMensaje = '';

    this.cdr.detectChanges();
  }
}