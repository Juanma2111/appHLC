import { Injectable } from '@angular/core';
import { CameraSource, CameraResultType, Camera } from '@capacitor/camera';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Asegúrate de importar estas referencias
import { Storage, getStorage } from '@angular/fire/storage'; // Importa el servicio de almacenamiento de AngularFire


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private storage: Storage) { }

  async foto () {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (!image.dataUrl) {
        return '';
      }
      
      const response = await fetch(image.dataUrl);
      const blob = await response.blob();
      
      //const storage = getStorage();
      const imageName = `images/${new Date().getTime()}.jpeg`;
      const imageRef = ref(this.storage, imageName);
      
      await uploadBytes(imageRef, blob);
      const imgUrl = await getDownloadURL(imageRef); // Obtener la URL pública de la imagen

      return imgUrl; // Devolver la URL de la imagen
      
    } catch (error) {
      console.error('Error al tomar la foto', error);
      return ''
    }
  }
}

