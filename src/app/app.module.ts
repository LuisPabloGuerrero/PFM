import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import {Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { SearchPipe } from './pipes/search';
import { FriendComponent } from './friend/friend.component';
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'conversation/:userId', component: ConversationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConversationComponent,
    LoginComponent,
    ContactComponent,
    SearchPipe,
    FriendComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
