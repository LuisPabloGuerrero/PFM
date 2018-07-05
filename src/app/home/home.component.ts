import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  name;
  status;
  email;
  nick;
  subNick;
  user_id;
  avatar;
  confirmacion;
  usuariologeado;
  query: string;
  private mdlSampleIsOpen = false;
  private openModal(open: boolean): void {
  this.mdlSampleIsOpen = open; }
  constructor(public authenticationService: AuthenticationService, public userFirebaseService: UserFirebaseService, public router: Router) {
    this.checkSession();
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result) =>  {
    this.users = result;
    console.log(this.users);
  });

  }
  printUser(userId)  {
    const stream = this.userFirebaseService.getUserById(userId);
    stream.valueChanges().subscribe((result) => {
      console.log(result);
  });
  }
  getUserById(userId)  {
    const stream = this.userFirebaseService.getUserLogged(userId);
    stream.valueChanges().subscribe((result) => {
      console.log(result);
    });
  }
  removeUser(userId)  {
    const promise = this.userFirebaseService.removeUserById(userId);
    promise.then( () => {
      alert('Usuario eliminado con exito');
    }).catch( (error) => {
      alert('Hubo un problema al eliminar al usuario');
      console.log(error);
    });
  }
  createUser()  {
    const user = {
      name: this.name,
      status: this.status,
      email: this.email,
      nick: this.nick,
      subNick: this.subNick,
      user_id: Date.now(),
      avatar: this.avatar
    };

    const promise =     this.userFirebaseService.createUser(user);
    promise.then( () => {
      alert('Usuario agregado con exito');
    }).catch((error) => {
      alert('El usuario no pudo ser agregado con exito');
      console.log(error);
    });
  }
  editUser()  {
    const user = {
      name: 'usuario editado',
      status: 'busy',
      email: 'elsapatero@hotmail.com',
      nick: 'editado',
      subNick: 'editado',
      user_id: 3
    };

    const promise =     this.userFirebaseService.createUser(user);
    promise.then( () => {
      alert('Usuario editado con exito');
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
      console.log(error);
    });
  }
  logOut() {
    // cerrar Sesion
    this.confirmacion = confirm('estas seguro que quiere desloguearse?');
    if (this.confirmacion === true) {
      const promise = this.authenticationService.logOut();
      promise.then( (data) => {
        console.log(data);
      this.router.navigate(['']);
      }).catch( (error) => {
        console.log(error);
      });
    }
  }
  checkSession() {
    // verificar sesión
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
      if (result === null ) {
        this.router.navigate(['']);
      }
      console.log(result.uid);
      this.getUserById(result.uid);
    });
  }
  ngOnInit() {
  }
}
