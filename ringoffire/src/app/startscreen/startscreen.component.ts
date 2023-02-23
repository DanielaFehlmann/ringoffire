import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

constructor(private firestore: Firestore, private router: Router) {} //privat, weil wir den Router nur in dieser Komponente benutzen wollen


  newGame() { //start Game
    let game = new Game();
    let coll = collection(this.firestore, 'games');
    addDoc(coll, game.toJson())
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}


//.then kann nur einmal aufgerufen werden
//.subscribe mehrfach