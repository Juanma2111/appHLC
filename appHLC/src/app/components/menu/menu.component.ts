import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/grupo.model';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {


  constructor(private notasService: NotasService) { }

  grupos: Grupo[] = [];
  ngOnInit() {
    this.grupos = this.notasService.getGrupos()
  }

  newGrupo() {
  throw new Error('Method not implemented.');
  }

  getGrupoColor(grupoId: string): string {
    const grupo = this.notasService.getGrupos().find(g => g.id === grupoId)
    return grupo?.color || "#B8B8B8";
  }
}
