import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FireChat';

  public chats: Observable<any[]>;
  constructor(
      db: AngularFirestore,
      public _cs: ChatService
  ) {
    this.chats = db.collection('Chats').valueChanges();
  }


}
