import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  backgroundColors = ['rgb(22,91,157)','rgb(255,85,85)','rgb(16, 124, 16)','rgb(219, 150, 0)','rgb(130,122,119)','rgb(0, 0, 0)','rgb(82, 50, 15)'];
  
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {

  }

  

}
