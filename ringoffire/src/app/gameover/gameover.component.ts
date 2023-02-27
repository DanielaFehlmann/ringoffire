import { Component } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})

export class GameoverComponent {
  playAgain() {
    window.location.href= '';
  }
}
