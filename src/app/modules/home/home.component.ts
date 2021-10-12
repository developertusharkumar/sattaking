import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allMultipleGames: any[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllMultipleGame();
  }

  goToResult() {
    this.router.navigate(['results']);
  }

  getAllMultipleGame() {
    this.dataService.getAllGames('multiple').on('value', (snapshot) => {
      const games: any[] = [];
      console.log('snapshot ', snapshot.val());

      // as the data is inside the format of object convert that into array to iterate
      const data = snapshot.val();

      // keys
      const gameKeys = Object.keys(data);
      console.log('game keys', gameKeys);
      gameKeys.forEach((game) => {
        games.push(data[game]); // { Gali1 }
      });

      console.log('game array', games);

      // all the games will be converted to the array
      this.allMultipleGames = games;
      console.log('games in the games array', games);

      console.log('data of the all games', data);
    });
  }
}
