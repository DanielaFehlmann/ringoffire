import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() name;
  @Input() playerActive: boolean = false;
  @Input() color;
}

