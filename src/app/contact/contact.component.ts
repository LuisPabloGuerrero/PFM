import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  timestamp = Date.now();
  price = 12.1;
  user = {
    name: 'luis',
    age: 27,
    status: 'hola que hace',
    friend: true };
  constructor() {
    // convierte el arreglo a observable
    /*
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(map( val => val + 10 ));
    const stream = example.subscribe( val => console.log(val));*/
   }

  ngOnInit() {
  }

}
