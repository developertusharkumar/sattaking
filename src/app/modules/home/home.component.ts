import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allMultipleGames: any[] = [];
  multipleDataTable: any;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllMultipleGame();
    this.getMultipleDataTable();
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

  getMultipleDataTable() {
    const dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };

    console.log('data object', dateObject);

    this.dataService
      .extractDataTable('multiple', dateObject)
      .on('value', (snapshot) => {
        console.log('snapshot ', snapshot.val());
        let tableChart = [];
        const data = snapshot.val();

        const dataTable :any = [];
      

        const datekeys = Object.keys(data);

        datekeys.forEach((date) => {
          // push the date "14"
          const gameKeys = data[date];
          const payload :any = {
            date: `${date}-${dateObject.month}`,
            allGames: []
          };

          const gameData = Object.entries(data[date]);  

          
          gameData.forEach((game) => {
            console.log('game', game[1]);
            payload['allGames'].push(game[1]);
          })


          dataTable.push(payload);

          console.log('getting all game keys', gameKeys);
          // console.log('entries', entries);

          

      
        })
        

        console.log('data table data', dataTable);
        this.multipleDataTable = dataTable;

      });
  }
}
