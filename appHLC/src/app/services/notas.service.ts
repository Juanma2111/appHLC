import { Injectable } from '@angular/core';
import { Nota } from '../models/nota.model';
import { Grupo } from '../models/grupo.model';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private firestore: Firestore) { }

  private notas: Nota[] = [];
  private grupos: Grupo[] = [
    {id: '1', nombre: 'Notas', color: '#70FFFE'},
    {id: '2', nombre: 'Trabajo', color: '#70FF79'},
    {id: '3', nombre: 'Compra', color: '#C970FF'}
  ]

  //NOTAS
  getNotas(): Observable<Nota[]> {
    const notasRef = collection(this.firestore, "notas");
    return collectionData(notasRef, { idField: 'id'}) as Observable<Nota[]>
  }
  
  agregarNota(nota: Nota) {
    const notasRef = collection(this.firestore, "notas");
    return addDoc(notasRef, nota);
  }

  async getNotaPorId(id: string) {
    const notaDocRef = doc(this.firestore, ('notas/' + id));

    const notaSnap = await getDoc(notaDocRef)
    return (notaSnap.data() as Nota);
  }

  actualizarNota(nuevaNota: Nota) {
    const indice = this.notas.findIndex(nota => nota.id === nuevaNota.id);

    if (indice !== -1) {
      this.notas[indice] = nuevaNota;
    } else {
      // Manejar el caso en que la nota no se encontró
      console.error(`No se encontró ninguna nota con el ID: ${nuevaNota.id}`);
    }
  }

  async borrarNota(nota: Nota){
    const notaDocRef = doc(this.firestore, ('notas/' + nota.id));
    return await deleteDoc(notaDocRef)
  }

  //GRUPOS
  getGrupos(): Grupo[] {
    return this.grupos;
  }

  agregarGrupo(grupo: Grupo) {
    this.grupos.push(grupo);
  }
}
