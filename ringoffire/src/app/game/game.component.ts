import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game'; //Game importieren, um darauf zuzugreifen
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from '@angular/fire/app';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  game: Game;
  games$: Observable<any>;
  games: Array<any>[];
  id: string;
  coll: any;
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    
  }


  ngOnInit() {
    this.coll = collection(this.firestore, 'games');
    this.games$ = collectionData(this.coll);
    this.newGame();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.games$.subscribe( async () => {
        let docRef = doc(this.firestore,"games",this.id);
        let docSnap = await getDoc(docRef);
        let data = await docSnap.data();
        this.game.currentPlayer = data['currentPlayer'];
        this.game.playedCards = data['playedCards'];
        this.game.players = data['players'];
        this.game.stack = data['stack'];
        this.game.pickCardAnimation = data['pickCardAnimation'];
        this.game.currentCard = data['currentCard'];
      })
    })
  }


  newGame() {
    this.game = new Game();
  }


  saveGame() {
    let docRef = doc(this.firestore,"games",this.id);
    updateDoc(docRef, this.game.toJson());
  }


  takeCard() {
    this.game.stack.length = 0;
    console.log(this.game.stack.length);
    if (this.game.pickCardAnimation == false && this.game.players.length > 0 && this.game.stack.length > 0) {
    this.game.currentCard = this.game.stack.pop(); //pop -> man bekommt den letzten Wert aus dem array und gleichzeitig wird es aus dem array entfernt
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();
    }, 1500);
  } else if (this.game.stack.length == 0) {
    this.gameIsOver();
    console.log('stack empty');
  }
  }


  gameIsOver() {
    this.gameOver = true;
    console.log(this.gameOver);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
