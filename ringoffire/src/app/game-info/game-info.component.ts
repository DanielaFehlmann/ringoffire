import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent implements OnChanges{
  cardAction = [
    { title: 'Waterfall', description: 'Each player starts drinking at the same time as the person to their left. NO player can stop drinking until the person before them stops' },
    { title: 'You', description: 'Choose who you want to take a drink' },
    { title: 'Me', description: 'You yourself take a drink' },
    { title: 'Floor', description: 'Last person to touch the floor drinks' },
    { title: 'Guys', description: 'All men drink' },
    { title: 'Chicks', description: 'All women drink' },
    { title: 'Heaven', description: 'Last one to put their hands in the air drinks' },
    { title: 'Mate', description: 'Choose a mate. Whenever you drink, they drink, and vice versa. If your mate already has a mate, you are now one long mate chain' },
    { title: 'Rhyme', description: 'Choose a word and go around the circle coming up with words that rhyme with that word. If someone gets stuck, they drink, and the turn is over' },
    { title: 'categories', description: 'Choose a category (e.g.: car brands) - everyone must name something that falls within the category'},
    { title: 'Questionmaster', description: 'You are the question master. If someone answers to your questions they have to drink' },
    { title: 'Never have i ever...', description: 'Start a game of never have I ever' },
    { title: 'Rule', description: 'Make a rule  everyone has to follow. If they do not they have to drink' },
  ];

  title = '';
  description = '';
  @Input() card: string;


  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber -1].title;
      this.description = this.cardAction[cardNumber -1].description;
    }
  }

  
}
