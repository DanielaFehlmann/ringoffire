import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

constructor(private router: Router) {} //privat, weil wir den Router nur in dieser Komponente benutzen wollen


  newGame() { //start Game
    this.router.navigateByUrl('/game');
  }
}


