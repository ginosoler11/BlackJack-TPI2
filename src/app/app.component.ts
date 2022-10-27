import { Component } from '@angular/core';

import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '21blackjack';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDHBy0vTb167-QtsDHQSXucII5qubk7YrE',
      authDomain: 'blackjack-85e5b.firebaseapp.com',
    });
  }
}
