import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from '../../../node_modules/rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationService } from '../authentication.service';
import { UserFirebaseService } from '../user-firebase.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  userId: any;
  user: any;
  myUser: any;
  size;
  myUserName: any;
  constructor(public authenticationService: AuthenticationService, public userFirebaseService: UserFirebaseService,
    private storage: AngularFireStorage, private db: AngularFirestore, public router: Router) {
      const streamUsuario = this.authenticationService.getStatus();
      streamUsuario.subscribe( (resultad) => {
       this.getUserById(resultad.uid);
        this.user = resultad;
        console.log(this.user);
      });
      }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `avatares/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // The file's download URL
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
    ).subscribe();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
           // Update firestore on completion
           // this.db.collection('photos').add( { path, size: snap.totalBytes });
        }
      })
    );
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
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
  setUserAvatar(path) {
    console.log(path);
    const user = {
      name: this.myUser.name,
      status: this.myUser.status,
      email: this.myUser.email,
      nick: this.myUser.nick,
      subNick: this.myUser.subNick,
      user_id: this.user.uid,
      avatar: path
    };
    const promise =     this.userFirebaseService.editUser(user);
    promise.then( () => {
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
      console.log(error);
    });
  }
  setUserName() {
    const user = {
      name: this.myUserName,
      status: this.myUser.status,
      email: this.myUser.email,
      nick: this.myUser.nick,
      subNick: this.myUser.subNick,
      user_id: this.user.uid,
      avatar: this.myUser.avatar
    };
    const promise =     this.userFirebaseService.editUser(user);
    promise.then( () => {
    }).catch((error) => {
      alert('El usuario no pudo ser editado con exito');
      console.log(error);
    });
  }
  getUserById(userId)  {
    const stream = this.userFirebaseService.getUserLogged(userId);
    stream.valueChanges().subscribe((result) => {
      console.log(result);
      this.myUser = result;
    });
  }
}
