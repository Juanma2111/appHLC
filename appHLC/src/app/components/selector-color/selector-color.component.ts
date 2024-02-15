import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-selector-color',
  templateUrl: './selector-color.component.html',
  styleUrls: ['./selector-color.component.scss'],
})
export class SelectorColorComponent  implements OnInit {

  colores: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  constructor(private popoverController: PopoverController) {}

  seleccionarColor(color: string) {
    this.popoverController.dismiss({ color });
  }

  ngOnInit() {}

}
