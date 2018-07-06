import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }
  createRequest (request, email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.object( 'requests/' + cleanEmail +  '/' + request.sender)
     .set(request);
  }
  getRequestForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list( 'requests/' + cleanEmail);
  }
  setRequestStatus(request, status) {
    const cleanEmail = request.receiver.replace('.', ',');
    return this.angularFireDatabase.object( 'requests/' + cleanEmail + '/' + request.sender +
  '/status').set(status);
  }
}
