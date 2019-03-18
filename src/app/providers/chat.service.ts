import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<Mensaje>;
    items: Observable<Mensaje[]>;

    public chats: Mensaje[] = [];

    constructor(private afs: AngularFirestore) {

    }
    addItem(item: Mensaje) {
       this.itemsCollection.add(item);
    }

    cargarMensajes() {
        this.itemsCollection = this.afs.collection<Mensaje>('Chats',
        ref=>ref.orderBy('fecha','desc').limit(10));
        return this.itemsCollection
                .valueChanges()
                .pipe(
                    map( (mensajes: Mensaje[]) =>{
                        console.log( mensajes );
                        this.chats = [];

                        for (let mensaje of mensajes) {
                            this.chats.unshift(mensaje)
                        }
                        return this.chats;
                    } )
                );
    }

    agregarMensaje( texto:string ){
        // TODO: uid
        let mensaje: Mensaje = {
            nombre: '',
            mensaje: texto,
            fecha: new Date().getTime()
        }

        return this.itemsCollection.add(mensaje);
    }
}
