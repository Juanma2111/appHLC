import { Component, Input, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notas: Nota[] = [];
  grupoSeleccionado: string  = ''

  constructor(private notasService: NotasService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe(notas => {
      this.notas = notas;
    });

    this.route.params.subscribe(params => {
      this.grupoSeleccionado = params['grupoSeleccionado']
    })
    if (this.grupoSeleccionado == undefined) {
      this.grupoSeleccionado = ''
    }
  }

  agregarNota() {
    this.router.navigate(['/notas']);
  }

  verNota(nota: Nota) {
    const notaId = nota.id;
    this.router.navigate(['/notas', notaId]);
  }

  getGrupoNombre(grupoId: string){
    const grupo = this.notasService.getGrupos().find(g => g.id === grupoId)
    return grupo?.nombre;
  }

  getGrupoColor(grupoId: string): string {
    const grupo = this.notasService.getGrupos().find(g => g.id === grupoId)
    return grupo?.color || "#B8B8B8";
  }

}
