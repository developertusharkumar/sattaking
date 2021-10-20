import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  multipleDataTable: any;
  allMultipleGames: any[] | undefined;
  allSingleGames: any[] | undefined;
  allCurrentMultipleGame: any = {};
  allCurrentSingleGame: any;
  dateObject: { date: number; month: string; year: number };
  singleGames: any[] | undefined;

  constructor(private router: Router, private dataService: DataService) {
    this.dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };
  }

  ngOnInit(): void {

    this.getAllMultipleGame();
    this.getAllSingleGames();
    this.getMultipleDataTable();
    this.getAllCurrentMultipleGames();
    this.getAllCurrentSingleGames();
  }

  goToResult() {
    this.router.navigate(['results']);
  }

  getAllMultipleGame() {
    this.dataService.getAllGames('multiple').on('value', (snapshot) => {
      this.allMultipleGames = this.extractArrayFromObjects(snapshot.val());
    });
  }

  getAllCurrentMultipleGames() {
    this.dataService.getAllCurrentGames('multiple').on('value', (snapshot) => {
      this.allCurrentMultipleGame = snapshot.val();

      console.log('all current multple Game', this.allCurrentMultipleGame);
    });
  }
  getAllCurrentSingleGames() {
    this.dataService.getAllCurrentGames('single').on('value', (snapshot) => {
      const games = this.extractArrayFromObjects(snapshot.val());
      console.log(
        'snapshot value for the current single games',
        snapshot.val()
      );

      // iterate the single games and plug the data of the data tables inside it
      games?.forEach((game  :any) => {
        // extract the data table
        this.dataService
          .extractDataTable('single', this.dateObject)
          .on('value', (snapshot) => {
            console.log(
              'snapshot value for the single data table',
              snapshot.val()
            );
            const singleGamesData = snapshot.val();
            const timeSlots =  singleGamesData[this.dateObject.date][game.name]['time_slots'];
            game['time_slots'] = this.extractArrayFromObjects(timeSlots);
             
          });

          // game['time_slo']
      });

      console.log('games data after putting the slots', games);

      this.singleGames = games;

      console.log('all current single Game', this.singleGames);
    });
  }

  extractTheSingleGameDataTable() {}

  getMultipleDataTable() {
    console.log('data object', this.dateObject);

    this.dataService
      .extractDataTable('multiple', this.dateObject)
      .on('value', (snapshot) => {
        console.log('snapshot ', snapshot.val());
        let tableChart = [];
        const data = snapshot.val();

        const dataTable: any = [];

        const datekeys = Object.keys(data);

        datekeys.forEach((date) => {
          // push the date "14"
          const gameKeys = data[date];
          const payload: any = {
            date: `${date}-${this.dateObject.month}`,
            allGames: [],
          };

          const gameData = Object.entries(data[date]);

          gameData.forEach((game) => {
            console.log('game', game[1]);
            payload['allGames'].push(game[1]);
          });

          dataTable.push(payload);

          console.log('getting all game keys', gameKeys);
          // console.log('entries', entries);
        });

        console.log('data table data', dataTable);
        this.multipleDataTable = dataTable;
      });
  }

  getResults(singleGame :any) {
    this.router.navigate([`${singleGame.name}/results`])
  }

  getAllSingleGames() {
    this.dataService.getAllGames('single').on('value', (snapshot) => {
      // all the games will be converted to the array
      this.allSingleGames = this.extractArrayFromObjects(snapshot.val());
    });
  }

  extractArrayFromObjects(value :any): any[] | any {
    if (value) {
      const games: any[] = [];


      // as the data is inside the format of object convert that into array to iterate
      const data = value;

      // keys
      const gameKeys = Object.keys(data);
      console.log('game keys', gameKeys);
      gameKeys.forEach((game) => {
        games.push(data[game]); // { Gali1 }
      });

      return games;
    }
  }
}
