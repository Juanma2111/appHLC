import { Component, Input, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/models/grupo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notas: Nota[] = [];
  grupo: Grupo = {id: '', nombre: '', color: '#'};
  grupoSeleccionado: string  = ''

  constructor(private notasService: NotasService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe(notas => {
      this.notas = notas;
      console.log(notas)
    });

    this.route.params.subscribe(params => {
      this.grupoSeleccionado = params['grupoSeleccionado'] || ''
    })
  }

  agregarNota() {
    this.router.navigate(['/notas']);
  }

  verNota(nota: Nota) {
    const notaId = nota.id;
    this.router.navigate(['/notas', notaId]);
  }

  getGrupoNombre(grupoId: string){
    this.notasService.getGrupos().subscribe(grupos => {
      const grupo = grupos.find(g => g.id === grupoId)
      return grupo?.nombre;

    })
  }

  getGrupoColor(grupoId: string): string {
    this.notasService.getGrupos().subscribe(grupos => {
      const gr = grupos.find(g => g.id === grupoId)
      if (gr != undefined) {
        this.grupo = gr
      }
    })
    return this.grupo?.color || "#B8B8B8";
  }

}
