import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';
import { Router } from '../../../node_modules/@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../request.service';
import { subscribeOn } from '../../../node_modules/rxjs/operators';
import { VirtualTimeScheduler } from '../../../node_modules/rxjs';
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
  nickValue: string;
  subNick;
  user_id;
  avatar;
  confirmacion;
  usuariologeado;
  query: string;
  requestEmail: string;
  user: any;
  myUser: any;
  subNickValue: string;
  shouldAdd = 'yes';
  requests = [];
  currentRequest: any;
  userObject: any;
  @ViewChild ('friendRequest') friendRequestModal;
  private mdlSampleIsOpen = false;
  private openModal(open: boolean): void {
  this.mdlSampleIsOpen = open; }
  constructor(public authenticationService: AuthenticationService, public userFirebaseService: UserFirebaseService,
    public router: Router, private modalService: NgbModal, public requestService: RequestService) {
    this.checkSession();
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe( (result) =>  {
    this.users = result;
    console.log(this.users);
    this.getRequestForEmail();
  });
  const streamUsuario = this.authenticationService.getStatus();
  streamUsuario.subscribe( (resultad) => {
   this.getUserById(resultad.uid);
    this.user = resultad;
    console.log(this.user);
    this.userFirebaseService.getUserById(this.user.uid).valueChanges().subscribe(
      (result2) => {
        this.userObject = result2;
        console.log(this.userObject);
        this.userObject.friends = Object.values(this.userObject.friends);

      });
  });
  }
  getRequestForEmail() {
    const stream = this.requestService.getRequestForEmail(this.user.email);
    stream.valueChanges().subscribe( (requests) => {
      this.requests = requests;
      this.requests = this.requests.filter( (r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach( (r) => {
        this.currentRequest = r;
        this.openModalRequest();
      });
      console.log(this.requests);
    });
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then(
        () => {
          this.userFirebaseService.addFriend(this.user.uid, this.currentRequest.sender);
          alert('Sí aceptó, dijo que chi');
        });
    } else {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected');
      alert('no aceptó alv');
    }
  }
  decideLater() {
    alert('decidiremos despues');
    this.requestService.setRequestStatus(this.currentRequest, 'decide_later');
  }
  openModalRequest() {
    this.modalService.open(this.friendRequestModal);
  }
  open(content) {
    this.modalService.open(content).result.then( (result) => {
    console.log(result);
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
      this.myUser = result;
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
  /*reateUser()  {
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
  }*/
  setUserProperty(status, value) {
    const user = {
      name: this.myUser.name,
      status: value,
      email: this.myUser.email,
      nick: this.myUser.nick,
      subNick: this.myUser.subNick,
      user_id: this.user.uid,
      avatar: this.myUser.avatar,
      friends: this.myUser.friends
    };
    const promise =     this.userFirebaseService.editUser(user);
    promise.then( () => {
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
      console.log(error);
    });
  }
  setUserSubNick() {
    const user = {
      name: this.myUser.name,
      status: this.myUser.status,
      email: this.myUser.email,
      nick: this.myUser.nick,
      subNick: this.subNickValue,
      user_id: this.user.uid,
      avatar: this.myUser.avatar,
      friends: this.myUser.friends
    };
    const promise =     this.userFirebaseService.editUser(user);
    promise.then( () => {
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
      console.log(error);
    });
  }
  setUserNick() {
    const user = {
      name: this.myUser.name,
      status: this.myUser.status,
      email: this.myUser.email,
      nick: this.nickValue,
      subNick: this.myUser.subNick,
      user_id: this.user.uid,
      avatar: this.myUser.avatar,
      friends: this.myUser.friends
    };
    const promise =     this.userFirebaseService.editUser(user);
    promise.then( () => {
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
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
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver: this.requestEmail,
      status: 'pending',
      sender: this.user.uid
    };
    console.log(request);
    this.requestService.createRequest(request, this.requestEmail).then( () => {
      alert('solicitud Enviada');
    });
  }
  ngOnInit() {
  }
}
