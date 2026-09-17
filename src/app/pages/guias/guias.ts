import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuiasService } from '../../core/services/guias.service';

@Component({
  selector: 'app-guias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guias.html',
  styleUrl: './guias.css'
})
export class Guias {

  pestana = 'crear';

  numeroGuia = '';
  estado = '';
  usuarioId = '';
  origen = '';

  guia: any = undefined;
  eventos: any[] = [];

  mensaje = '';
  tipoMensaje = '';

  constructor(
    private readonly guiasService: GuiasService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  cambiarPestana(pestana: string): void {

    this.pestana = pestana;

    this.guia = undefined;
    this.eventos = [];
    this.mensaje = '';
    this.tipoMensaje = '';

    this.cdr.detectChanges();
  }

  crear(): void {

    const numero = this.numeroGuia.trim();

    if (!numero) {
      this.mensaje = 'Ingrese un número de guía';
      this.tipoMensaje = 'error';
      this.cdr.detectChanges();
      return;
    }

    this.mensaje = '';
    this.guia = undefined;

    this.guiasService.crearGuia(numero).subscribe({
      next: (response) => {

        console.log('Guía creada:', response);

        this.guia = response;
        this.mensaje = 'Guía creada correctamente';
        this.tipoMensaje = 'success';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error creando guía:', error);

        this.guia = undefined;
        this.mensaje = 'No fue posible crear la guía';
        this.tipoMensaje = 'error';

        this.cdr.detectChanges();
      }
    });
  }

  buscar(): void {

    const numero = this.numeroGuia.trim();

    if (!numero) {
      this.mensaje = 'Ingrese un número de guía';
      this.tipoMensaje = 'error';
      this.cdr.detectChanges();
      return;
    }

    this.mensaje = '';
    this.guia = undefined;

    this.guiasService.consultarGuia(numero).subscribe({
      next: (response) => {

        console.log('Guía consultada:', response);

        this.guia = response;
        this.mensaje = 'Guía encontrada';
        this.tipoMensaje = 'success';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error consultando guía:', error);

        this.guia = undefined;
        this.mensaje = 'No se encontró la guía';
        this.tipoMensaje = 'error';

        this.cdr.detectChanges();
      }
    });
  }

  cambiarEstado(): void {

    const numero = this.numeroGuia.trim();

    if (
      !numero ||
      !this.estado.trim() ||
      !this.usuarioId.trim() ||
      !this.origen.trim()
    ) {
      this.mensaje = 'Complete todos los campos';
      this.tipoMensaje = 'error';
      this.cdr.detectChanges();
      return;
    }

    this.mensaje = '';
    this.guia = undefined;

    this.guiasService.cambiarEstado(
      numero,
      this.estado.trim(),
      this.usuarioId.trim(),
      this.origen.trim()
    ).subscribe({
      next: (response) => {

        console.log('Estado cambiado:', response);

        this.guia = response;
        this.mensaje = 'Estado cambiado correctamente';
        this.tipoMensaje = 'success';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error cambiando estado:', error);

        this.guia = undefined;
        this.mensaje = 'No fue posible cambiar el estado';
        this.tipoMensaje = 'error';

        this.cdr.detectChanges();
      }
    });
  }

  consultarHistorial(): void {

    const numero = this.numeroGuia.trim();

    if (!numero) {
      this.mensaje = 'Ingrese un número de guía';
      this.tipoMensaje = 'error';
      this.cdr.detectChanges();
      return;
    }

    this.mensaje = '';
    this.eventos = [];

    this.guiasService.consultarHistorial(numero).subscribe({
      next: (response) => {

        console.log('Historial:', response);

        this.eventos = response;
        this.mensaje = 'Historial consultado correctamente';
        this.tipoMensaje = 'success';

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error consultando historial:', error);

        this.eventos = [];
        this.mensaje = 'No se encontró el historial';
        this.tipoMensaje = 'error';

        this.cdr.detectChanges();
      }
    });
  }

  limpiar(): void {

    this.numeroGuia = '';
    this.estado = '';
    this.usuarioId = '';
    this.origen = '';

    this.guia = undefined;
    this.eventos = [];

    this.mensaje = '';
    this.tipoMensaje = '';

    this.cdr.detectChanges();
  }
}