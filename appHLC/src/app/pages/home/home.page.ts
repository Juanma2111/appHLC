import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notas: Nota[] = [];

  constructor(private notasService: NotasService, private router: Router) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe(notas => {
      this.notas = notas;
    });
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

  // ionViewWillEnter() {
  //   this.notasService.getNotas().subscribe(notas => {
  //     console.log(notas)
  //   });
  // }
}
