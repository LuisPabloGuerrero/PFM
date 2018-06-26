import { Component, OnInit } from '@angular/core';
//import { UserService } from '../user.service';
import * as $ from 'jquery';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(public userFirebaseService: UserFirebaseService)
  {
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result) =>
  {
    this.users = result;
    console.log(result);
  });
  }
  printUser(userId)
  {
    const stream = this.userFirebaseService.getUserById(userId);
    stream.valueChanges().subscribe((result)=>{
     console.log(result);
  })
  }
  removeUser(userId)
  {
    const promise = this.userFirebaseService.removeUserById(userId);
    promise.then( ()=>{
      alert('Usuario eliminado con exito');
    }).catch( (error)=>{
      alert('Hubo un problema al eliminar al usuario');
      console.log(error);
      
    });
  }
  name;
  status;
  email;
  nick;
  subNick;
  user_id;
  createUser()
  {
    const user = {
      name: this.name,
      status: this.status,
      email: this.email,
      nick: this.nick,
      subNick: this.subNick,
      user_id: Date.now()
    };

    const promise =     this.userFirebaseService.createUser(user);
    promise.then( ()=>{
      alert("Usuario agregado con exito");
    }).catch((error)=>{
      alert("El usuario no pudo ser agregado con exito");
      console.log(error);
    });
  }
  editUser()
  {
    const user = {
      name: "usuario editado",
      status: "busy",
      email: "elsapatero@hotmail.com",
      nick: "editado",
      subNick: "editado",
      user_id: 3
    };

    const promise =     this.userFirebaseService.createUser(user);
    promise.then( ()=>{
      alert("Usuario editado con exito");
    }).catch((error)=>{
      alert("El usuario no pudo ser editado con exito");
      console.log(error);
    });
  }
  ngOnInit() {
  }

  private mdlSampleIsOpen : boolean = false;
private openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
}
}
