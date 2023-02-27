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
import { EditPlayerComponent } from '../edit-player/edit-player.component';


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

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    
  }


  ngOnInit() {
    this.coll = collection(this.firestore, 'games');
    this.games$ = collectionData(this.coll);
    this.newGame();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.games$.subscribe( () => {
        this.getCorrectDocument();
      })
    })
  }


  newGame() {
    this.game = new Game();
  }


  async getCorrectDocument() {
    let docRef = doc(this.firestore,"games",this.id);
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    this.updateData(data);
  }


  updateData(data) {
    this.game.players = data['players'];
    this.game.colors = data['colors'];
    this.game.stack = data['stack'];
    this.game.playedCards = data['playedCards'];
    this.game.currentPlayer = data['currentPlayer'];
    this.game.pickCardAnimation = data['pickCardAnimation'];
    this.game.currentCard = data['currentCard'];
    this.game.gameOver = data['gameOver'];
  }


  takeCard() {
    if (this.enoughPlayersAndCards()) {
      this.takingCard();
    } else if (this.game.stack.length == 0) {
      this.game.gameOver = true;
      this.saveGame();
    } else if (this.game.players.length == 0) {
      this.openDialog();
    }
  }


  enoughPlayersAndCards() {
    return this.game.pickCardAnimation == false && this.game.players.length > 0 && this.game.stack.length > 0
  }


  takingCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
    this.game.pickCardAnimation = false;
    this.game.playedCards.push(this.game.currentCard);
    this.saveGame();
    }, 1500);
  }


  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change:string) => {
      if (change) {
        if (change == 'delete') {
          this.game.players.splice(playerId, 1);
          this.game.colors.splice(playerId, 1);
        } else {
          this.game.colors[playerId] = change; 
        }
      this.saveGame();
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name:string) => {
      if (name) {
        this.game.players.push(name);
        this.game.colors.push('rgb(130,122,119)');
        this.saveGame();
      }
    });
  }


  saveGame() {
    let docRef = doc(this.firestore,"games",this.id);
    updateDoc(docRef, this.game.toJson());
  }


}


