import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game'; //Game importieren, um darauf zuzugreifen
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { addDoc, collectionData, doc, Firestore, setDoc, getDoc, getFirestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; //Variable game vom Typ Game
  games$: Observable<any>;
  games: Array<any>[];
  
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    
  }


  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      const coll = collection(this.firestore, 'games');
      this.games$ = collectionData(coll);
      this.games$.subscribe(async (gameUpdate) => {
      this.games = gameUpdate;
      console.log(gameUpdate);
    })
    })
  }


  newGame() {
    this.game = new Game(); //Variable "game" bekommt ein neues Objekt erstellt //es wird ein JSON-Objekt mit all den Eigenschaften von "Game" erstellt
    const coll = collection(this.firestore, 'games');
    addDoc(coll, {game: this.game.toJson()});
  }


  takeCard() {
    if (this.pickCardAnimation == false && this.game.players.length > 0 ) {
    this.currentCard = this.game.stack.pop(); //pop -> man bekommt den letzten Wert aus dem array und gleichzeitig wird es aus dem array entfernt
    this.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length ;
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    }, 1500);
  }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }


}
