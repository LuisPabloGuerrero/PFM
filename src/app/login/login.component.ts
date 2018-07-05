import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  registerUid: any;
  navbar: any;
  confirmacion: boolean;
  usruid: string;
  constructor(public authenticationService: AuthenticationService, public userFireBaseService: UserFirebaseService, public router: Router) {
   const pagina = window.location.href;
   console.log(pagina);
   if ( pagina === 'http://localhost:4200/' || pagina === 'http://localhost:4200/login' ) {
    this.navbar = document.getElementById('nabvar');
    this.navbar.style.display = 'none';
   }
  }
  ngOnInit() {
  }
  register() {
  // hacer registro con firebase
    if ( this.password === this.repeatPassword) {
      const promise = this.authenticationService.emailRegistration( this.email, this.password);

      promise.then( (data) => {
        alert('Usuario registrado con exito');
        console.log(data);
        this.registerUid = data.user.uid;
        console.log(this.registerUid);
        this.insertOnDatabase(this.registerUid);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('las contraseñas tiene que coincidir');
    }
  }
  insertOnDatabase(uid) {
    const user = {
      user_id: uid,
      name: this.name,
      email: this.email
    };
    const promise = this.userFireBaseService.createUser(user);
    promise.then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  login()  {
    // logindeusuario

    const promise = this.authenticationService.emailLogin( this.email, this.password);
    promise.then((data) => {
      alert('Se logeo con exito');
      this.navbar = document.getElementById('nabvar');
      this.navbar.style.display = 'show';
      this.router.navigate(['home/']);
    }).catch((error) => {
      console.log(error);
    });
  }
  checkSession() {
    // verificar sesión
    const stream = this.authenticationService.getStatus();
    stream.subscribe( (result) => {
      console.log(result);
    });
  }
}
