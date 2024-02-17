import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/models/grupo.model';
import { Nota } from 'src/app/models/nota.model';
import { FiltroNotasPipe } from 'src/app/pipes/filtro-notas.pipe';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [FiltroNotasPipe]
})
export class ListComponent  implements OnInit {

  constructor(private notasService: NotasService, private router: Router) { }

  notas: Nota[] = []
  grupos: Grupo[] = []
  grupo: Grupo = {id: '', nombre: '', color: '#'};
  @Input() grupoSeleccionado: string  = '';

  ngOnInit() {
    this.notasService.getNotas().subscribe(notas => {
      this.notas = notas;
    });

    this.notasService.getGrupos().subscribe(grupos => {
      this.grupos = grupos
    })
  }

  verNota(nota: Nota) {
    const notaId = nota.id;
    this.router.navigate(['/notas', notaId]);
  }

  getGrupoColor(grupoId: string) {
      const grupo = this.grupos.find(g => g.id === grupoId)
      console.log(grupo?.color)
      return grupo?.color
  }
}
