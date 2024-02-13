import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';
import { FiltroNotasPipe } from '../pipes/filtro-notas.pipe';



@NgModule({
  declarations: [
    MenuComponent,
    ListComponent,
    FiltroNotasPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent,
    ListComponent
  ]
})
export class ComponentsModule { }
