import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Nota } from 'src/app/models/nota.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit{
  nuevaNota: Nota = { id: '', titulo: '', contenido: '' };
  nota: Nota = { id: '', titulo: '', contenido: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const notaId = params.get('id');
      
      if (notaId !== null) {
        const notaEncontrada = this.notasService.getNotaPorId(notaId);
        
        if (notaEncontrada) {
          this.nota = { ...notaEncontrada };
          
          // NOTA NOT FOUND
        } else {
          console.error('Nota no encontrada')
        }
        
        // ID NOTA NULL
      } else {
        this.nota = { id: '', titulo: '', contenido: '' };
      }
    });
    
  }

  guardarNota() {
    if (this.nota.id) {
      this.editarNota();
    } else {
      this.agregarNota();
    }

    this.volverAlInicio();
  }
  
  agregarNota() {
    this.notasService.agregarNota({ ...this.nota, id: Date.now().toString() });
  }

  editarNota() {
    this.notasService.actualizarNota(this.nota);
    this.router.navigate(['/home']);
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }


}