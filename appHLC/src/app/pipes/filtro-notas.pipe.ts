import { Pipe, PipeTransform } from '@angular/core';
import { Nota } from '../models/nota.model';

@Pipe({
  name: 'filtroNotas'
})
export class FiltroNotasPipe implements PipeTransform {

  transform(notas: Nota[], grupoSeleccionado: string | null): Nota[] {
    if (!grupoSeleccionado) {
      return notas;
    } else {
      return notas.filter(nota => nota.grupoId === grupoSeleccionado)
    }
    
  }

}
