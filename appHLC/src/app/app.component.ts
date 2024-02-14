import { Component } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nuevaNota: Nota = { id: '', titulo: '', contenido: '', grupoId: ''};
  grupoSeleccionado: string  = ''
  
  
  constructor (private router: Router) {}

  actualizarGrupoSeleccionado(grupoId: string): void {
    this.grupoSeleccionado = grupoId
    this.router.navigate(['/home', { grupoSeleccionado: this.grupoSeleccionado }]);
  }

  
}
