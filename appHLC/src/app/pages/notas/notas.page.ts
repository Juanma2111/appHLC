import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { Grupo } from 'src/app/models/grupo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit{
  nuevaNota: Nota = { id: '', titulo: '', contenido: '', grupoId: '' };
  nota: Nota = { id: '', titulo: '', contenido: '', grupoId: '' };
  grupos: Grupo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService
  ) {}

  async ngOnInit() {
    this.grupos = this.notasService.getGrupos();

    this.route.paramMap.subscribe(async params => {
      const notaId = params.get('id');
      
      if (notaId !== null) {
        const notaEncontrada = await this.notasService.getNotaPorId(notaId);
        
        if (notaEncontrada) {
          this.nota = { ...notaEncontrada };
          
          // NOTA NOT FOUND
        } else {
          console.error('Nota no encontrada')
        }
        
        // ID NOTA NULL
      } else {
        this.nota = { id: '', titulo: '', contenido: '', grupoId: '' };
      }
    });
    
  }

  //METODOS NOTAS
  guardarNota() {
    if (this.nota.id) {
      this.editarNota();
    } else {
      this.agregarNota();
    }

    this.volverAlInicio();
  }
  
  async agregarNota() {
    const response = await this.notasService.agregarNota({ ...this.nota, id: Date.now().toString() });
    console.log(response)
  }

  editarNota() { 
    this.notasService.actualizarNota(this.nota);
    this.router.navigate(['/home']);
  }

  async borrarNota() { //----------------------------NO BORRA
    const response = await this.notasService.borrarNota({ ...this.nota});
    console.log(response)
    this.router.navigate(['/home']);
  }

  //METODOS GRUPOS
  actualizarGrupo(event: any) {      // -------------------------------------------------------------------------------------
    this.nota.grupoId = event.detail.value;
  }

  getGrupoColor(): string {
    const grupoActual = this.grupos.find(grupo => grupo.id === this.nota?.grupoId);
    return grupoActual?.color || "#B8B8B8";
  }


  volverAlInicio() {
    this.router.navigate(['/home']);
  }


}