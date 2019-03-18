import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<any>;
    items: Observable<any[]>;

    public chat: any[] = [];

    constructor(private afs: AngularFirestore) {

    }
    addItem(item: any) {
       this.itemsCollection.add(item);
    }

    cargarMensajes() {
        this.itemsCollection = this.afs.collection<any>('Chats');
        return this.itemsCollection.valueChanges();
    }
}
