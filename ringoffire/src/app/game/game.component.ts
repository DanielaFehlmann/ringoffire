import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game'; //Game importieren, um darauf zuzugreifen
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; //eine Variable game vom Typ Game

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
   this.newGame();

  }


  newGame() {
    this.game = new Game(); //Variable "game" bekommt ein neues Objekt erstellt //es wird ein JSON-Objekt mit all den Eigenschaften von "Game" erstellt
    console.log(this.game);
  }


  takeCard() {
    if (this.pickCardAnimation == false) {
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
