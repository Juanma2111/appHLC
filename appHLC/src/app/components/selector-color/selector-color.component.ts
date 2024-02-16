import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-selector-color',
  templateUrl: './selector-color.component.html',
  styleUrls: ['./selector-color.component.scss'],
})
export class SelectorColorComponent  implements OnInit {

  colores: string[] = ['#009f4d', '#84bd00', '#efdf00', '#fe5000', '#e4002b', '#da1884', '#962EC6', '#0077c8', '#0BCAD3'];

  @Output() colorSeleccionado = new EventEmitter<string>();

  constructor(private popoverController: PopoverController) {}

  seleccionarColor(color: string) {
    this.colorSeleccionado.emit(color);
    this.popoverController.dismiss({ color })
  }

  ngOnInit() {}

}
