import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';
import { ConversationService } from '../conversation.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  userId: any;
  id: any;
  user: any;
  friend: any;
  message: string;
  ids = [];
  conversation: any;
  doingZumbido = false;
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService,
    public authenticationService: AuthenticationService, public conversationService: ConversationService) {
    this.id = activatedRoute.snapshot.params['userId'];
    this.authenticationService.getStatus().subscribe((response) => {
      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe((user) => {
        this.user = user;
        console.log(this.user);
        this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result: any) => {
          this.friend = result;
          console.log(this.friend);
          this.getConversationMessages();
        });
      });
    });
  }
  sendMessages() {
    console.log(this.friend);
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'text',
      content: this.message.replace(/\n$/, '')
    };
    this.conversationService.createConversation(messageObject).then(() => {
      const audio = new Audio('assets/sound/new_message.m4a');
      audio.play();
    }).catch((error) => {
      console.log(error);
    });
    this.message = '';
  }
  sendZumbido() {
    console.log(this.friend);
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'zumbido'
    };
    this.conversationService.createConversation(messageObject).then(() => {
      this.showZumbido();
    }).catch((error) => {
      console.log(error);
    });
    this.message = '';
  }
  showZumbido() {
    this.doingZumbido = true;
    window.setTimeout(() => {
      this.doingZumbido = false;
    }, 1000);
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }
  getConversationMessages() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    console.log(this.ids.join('||'));
          const stream = this.conversationService.getConversation(this.ids.join('||'));
          stream.valueChanges().subscribe((resultConversation) => {
            this.conversation = resultConversation;
            this.conversation.forEach( (message) => {
               if (!message.seen && message.sender !== this.user.user_id) {
                console.log(message, this.conversation);
                const promise = this.conversationService.setConversationAttribute(message.uid, message.timestamp, 'seen', true);
                promise.then( () => {
                });
                if (message.type === 'zumbido') {
                  this.showZumbido();
                }
                if (message.type === 'text') {
                  const audio = new Audio('assets/sound/zumbido.m4a');
                  audio.play();
                }
               }
            });
    });
  }
  getNickById(id) {
    if (id === this.user.user_id) {
      return this.user.nick;
    } else {
      return this.friend.nick;
    }
  }
  ngOnInit() {
  }
}
