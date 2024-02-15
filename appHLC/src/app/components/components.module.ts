import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';
import { FiltroNotasPipe } from '../pipes/filtro-notas.pipe';
import { SelectorColorComponent } from './selector-color/selector-color.component';



@NgModule({
  declarations: [
    MenuComponent,
    ListComponent,
    FiltroNotasPipe,
    SelectorColorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent,
    ListComponent,
    SelectorColorComponent
  ]
})
export class ComponentsModule { }
