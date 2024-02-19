import { Injectable } from '@angular/core';
import { CameraSource, CameraResultType, Camera } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async foto () {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      // Aquí puedes manejar la imagen capturada (por ejemplo, subirla a un servidor)
      return image.webPath;
    } catch (error) {
      console.error('Error al tomar la foto', error);
      return ''
    }
  }
}

