import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    {nick: 'Luis', subNick: 'Saca los tamales', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 1},
    {nick: 'Pablo', subNick: 'mi Subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 2},
    {nick: 'Atenas', subNick: 'mi Subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 3},
    {nick: 'Arisbel', subNick: 'mi Subnick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email.com', userId: 4}
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }
  getUserById(userId)  {
    let user = {};
    user = this.users.filter( (u) => {
      return u.userId === userId;
    })[0];
    return user;
  }

}
