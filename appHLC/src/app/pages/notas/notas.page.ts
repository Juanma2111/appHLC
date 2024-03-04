import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { Grupo } from 'src/app/models/grupo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit{
  nuevaNota: Nota = { id: '', titulo: '', contenido: '', grupoId: '' };
  nota: Nota = { id: '', titulo: '', contenido: '', grupoId: '' };
  grupos: Grupo[] = [];
  notaId: string | null = '';
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private cameraService: CameraService
  ) {}

  async ngOnInit() {
    this.notasService.getGrupos().subscribe(grupos => {
      this.grupos = grupos
    })

    this.route.paramMap.subscribe(async params => {
      this.notaId = params.get('id');
      
      if (this.notaId !== null) {
        const notaEncontrada = await this.notasService.getNotaPorId(this.notaId);
        
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
      if (this.nota.id && this.notaId) {
        this.nota.id = this.notaId;
      }
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
  }

  async borrarNota() { 
    if (this.notaId == null || this.notaId == '') {
      console.log('NOTA NO ENCONTRADA')
    } else {
      const response = await this.notasService.borrarNota( this.notaId );
      console.log(response)
      this.router.navigate(['/home']);
    }
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


  //HACER FOTO
  async hacerFoto() {
    const imagePath = await this.cameraService.foto();
    if (imagePath != undefined) {
      this.nota.imagenPath = imagePath
      this.notasService.addImagen(this.nota, imagePath)
    }
  }
}