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
  ngOnInit() {
    this.grupos = this.notasService.getGrupos()
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
          text: 'Seleccionar Color',
          handler: () => {
            this.mostrarSelectorColor();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // Aquí puedes manejar los datos ingresados por el usuario (data)
            console.log('Nuevo Grupo:', data);
          },
        },
      ],
    });
  
    await alert.present();
  }

  getGrupoColor(grupoId: string): string {
    const grupo = this.notasService.getGrupos().find(g => g.id === grupoId)
    return grupo?.color || "#B8B8B8";
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
  
    const { data } = await popover.onWillDismiss();
  
    if (data && data.color) {
      // Aquí puedes manejar el color seleccionado desde el selector de color
      console.log('Color seleccionado:', data.color);
    }
  }
}
