import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { AngularFireModule } from '../../node_modules/angularfire2';
@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(private angularFire: AngularFireModule, private angularFireDatabase: AngularFireDatabase) { }
}
