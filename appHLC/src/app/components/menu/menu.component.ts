import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Grupo } from 'src/app/models/grupo.model';
import { NotasService } from 'src/app/services/notas.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { SelectorColorComponent } from '../selector-color/selector-color.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {


  constructor(private notasService: NotasService, private alertController: AlertController, private popoverController: PopoverController) { }

  @Output() grupoSeleccionado = new EventEmitter<string>();

  grupos: Grupo[] = [];
  colorSeleccionado: string = '#B8B8B8'
  nombreSeleccionado: string = ''

  ngOnInit() {
    this.notasService.getGrupos().subscribe(grupos => {
      this.grupos = grupos;
    });
    
  }

  async crearGrupo() {
    const alert = await this.alertController.create({
      header: 'Nuevo Grupo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre del Grupo',
        },

      ],
      buttons: [
        {
          text: 'Siguiente',
          handler: data => {
            if (data.nombre.trim() != '') {
              this.nombreSeleccionado = data.nombre
              this.mostrarSelectorColor();
            } else console.log('NOMBRE EN BLANCO-------------------')

            return true
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
  
    await alert.present();
  }

  getGrupoColor(grupoId: string): string {
    const grupoActual = this.grupos.find(grupo => grupo.id === grupoId);
    return grupoActual?.color || "#B8B8B8";

  }

  seleccionarGrupo(grupoId: string): void {
    this.grupoSeleccionado.emit(grupoId)
  }

  async mostrarSelectorColor() {
    const popover = await this.popoverController.create({
      component: SelectorColorComponent,
      translucent: true,
      backdropDismiss: false,
      cssClass: 'color-selector-popover'
    });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
  
    if (data && data.color) {
      // Crear grupo
      this.colorSeleccionado = data.color

      const nuevoGrupo: Grupo = { 
        id: this.notasService.getGrupos.length.toString(),
        nombre: this.nombreSeleccionado,
        color: this.colorSeleccionado
      }
      this.notasService.agregarGrupo(nuevoGrupo)
    }

  }
}
