import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }
  createConversation (conversation) {
    return this.angularFireDatabase.object( 'conversation/' + conversation.uid + '/' +
    conversation.timestamp).set(conversation);
  }
  getConversation (uid) {
    return this.angularFireDatabase.list( 'conversation/' + uid);
  }
}
/*
conversations tiene una conversasion de dos personas
idconversation (una conversacion entre dosp ersonas)
idmensaje (un mensaje enviado por una de las personas)
 contiene sender, receiver, y toda la demas informacion text y timestamp
*/
