import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public angularFireDatabase: AngularFireDatabase, public angularFireAuth: AngularFireAuth) { }
  emailRegistration(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  emailLogin(email, password)  {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  getStatus()  {
    return this.angularFireAuth.authState;
  }
  logOut() {
    return this.angularFireAuth.auth.signOut();
  }
}
