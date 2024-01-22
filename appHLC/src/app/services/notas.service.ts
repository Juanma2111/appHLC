import { Injectable } from '@angular/core';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor() { }

  private notas: Nota[] = [];

  getNotas() {
    return this.notas.slice();
  }

  agregarNota(nota: Nota) {
    this.notas.push(nota);
  }

  getNotaPorId(id: string) {
    return this.notas.find(nota => nota.id === id);
  }

  actualizarNota(nuevaNota: Nota) {
    const indice = this.notas.findIndex(nota => nota.id === nuevaNota.id);

    if (indice !== -1) {
      this.notas[indice] = nuevaNota;
    } else {
      // Manejar el caso en que la nota no se encontró
      console.error(`No se encontró ninguna nota con el ID: ${nuevaNota.id}`);
    }
  }
}
