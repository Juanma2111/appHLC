import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { SelectorColorComponent } from 'src/app/components/selector-color/selector-color.component';
import { Grupo } from 'src/app/models/grupo.model';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  constructor(private notasService: NotasService, private alertController: AlertController, private popoverController: PopoverController) { }

  grupos: Grupo[] = [];
  idSeleccionado: string = ''
  colorSeleccionado: string = '#B8B8B8'
  nombreSeleccionado: string = ''

  ngOnInit() {
    this.notasService.getGrupos().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  async editarGrupo(grupo: Grupo) { //----------------------------------SOLO EDITA NOMBRE
    const alert = await this.alertController.create({
      header: 'Editar Grupo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: grupo.nombre,
          placeholder: 'Nombre del Grupo',
        }
      ],
      buttons: [
        {
          text: 'Color',
          handler: data => {
            if (data.nombre.trim() != '') {
              grupo.nombre = data.nombre;
              this.mostrarSelectorColor(grupo);
            } else console.log('NOMBRE EN BLANCO-------------------')

            return true
          }
        },
        {
          text: 'Guardar',
          handler: async data => {
            grupo.nombre = data.nombre;
            this.notasService.actualizarGrupo(grupo)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

    async borrarGrupo(grupo: Grupo) {
    const alert = await this.alertController.create({
      header: 'Confirmar Borrar',
      message: `¿Estás seguro de borrar el grupo "${grupo.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          handler: async () => {
            await this.notasService.borrarGrupo(grupo.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarSelectorColor(grupo: Grupo) {
    const popover = await this.popoverController.create({
      component: SelectorColorComponent,
      translucent: true,
      backdropDismiss: false,
      cssClass: 'color-selector-popover'
    });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
  
    if (data && data.color) {

      const grup: Grupo = { 
        id: grupo.id,
        nombre: grupo.nombre,
        color: data.color
      }
      await this.notasService.actualizarGrupo(grup);
    }

  }

}
