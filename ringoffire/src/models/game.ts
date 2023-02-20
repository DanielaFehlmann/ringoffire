export class Game {
  public players: string[] = [];
  public stack: string[] = []; //ungespielte Karten
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('hearts_' + i);
    }
    shuffle(this.stack);
  }
  //constructor ist eine Funktion wird immer am Anfang aufgerufen
  //in dieser Funktion kann man gewisse Logik aufrufen
}
//alle Felder die wir verwenden wollen
//public, damit man von überall darauf zugreifen kann


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}