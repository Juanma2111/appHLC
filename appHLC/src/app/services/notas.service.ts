import { Injectable } from '@angular/core';
import { Nota } from '../models/nota.model';
import { Grupo } from '../models/grupo.model';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private firestore: Firestore) { }

  // private gruposSubject = new BehaviorSubject<Grupo[]>([]);
  // grupos$ = this.gruposSubject.asObservable();

  private notas: Nota[] = [];
  private grupos: Grupo[] = [
    {id: '1', nombre: 'Compra', color: '#da1884'}
  ]

  //NOTAS
  getNotas(): Observable<Nota[]> {
    const notasRef = collection(this.firestore, "notas");
    return collectionData(notasRef, { idField: 'id'}) as Observable<Nota[]>
  }
  
  async getNotaPorId(id: string) {
    const notaDocRef = doc(this.firestore, ('notas/' + id));

    const notaSnap = await getDoc(notaDocRef)
    return (notaSnap.data() as Nota);
  }
  
  async agregarNota(nota: Nota) {
    const notasRef = collection(this.firestore, "notas");
    return await addDoc(notasRef, nota);
  }

  async actualizarNota(nuevaNota: Nota): Promise<void> { //---------------------------------------------------------------------
    const notaDocRef = doc(this.firestore, ('notas/' + nuevaNota.id));
    const cambios = {
      id: nuevaNota.id,
      titulo: nuevaNota.titulo,
      contenido: nuevaNota.contenido,
      grupoId: nuevaNota.grupoId,
    }

    await updateDoc(notaDocRef, cambios)
  }

  async addImagen(nota: Nota, imagenUrl: string){
    const notaDocRef = doc(this.firestore, ('notas/' + nota.id));
    const cambios = {
      imagenPath: imagenUrl
    }

    await updateDoc(notaDocRef, cambios)
  }

  async borrarNota(id: string){
    const notaDocRef = doc(this.firestore, 'notas', id);
    return await deleteDoc(notaDocRef)
  }

  //GRUPOS
  getGrupos(): Observable<Grupo[]> {
    const gruposRef = collection(this.firestore, 'grupos');
    return collectionData(gruposRef, { idField: 'id' }) as Observable<Grupo[]>;
    // grupos$.subscribe(grupos => {
    //   this.gruposSubject.next(grupos);
    // });

    // return grupos$;
  }

  async agregarGrupo(grupo: Grupo): Promise<void> {
    const gruposRef = collection(this.firestore, 'grupos');
    await addDoc(gruposRef, grupo);

    // const nuevaLista = this.gruposSubject.value.concat(grupo);
    // this.gruposSubject.next(nuevaLista);
  }

  async actualizarGrupo(grupo: Grupo): Promise<void> {
    const grupoDocRef = doc(this.firestore, 'grupos', grupo.id);
    const cambios = {
      id: grupo.id,
      nombre: grupo.nombre,
      color: grupo.color
    };

    await updateDoc(grupoDocRef, cambios);
  }

  async borrarGrupo(id: string): Promise<void> {
    const grupoDocRef = doc(this.firestore, 'grupos', id);
    await deleteDoc(grupoDocRef);
  }
}
