import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  userId: any;
  friend = {};
  constructor(public activatedRoute: ActivatedRoute, public userService: UserService) 
  {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    console.log(this.userId);
    this.userId = parseInt(this.userId);
    this.friend = this.userService.getUserById(this.userId);
    console.log(this.friend);
  }

  ngOnInit() {
  }

}
