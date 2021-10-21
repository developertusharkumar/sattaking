import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  searchTerm: string | undefined;
  page = 1;
  pageSize = 4;
  collectionSize: number | undefined;
  currentRate = 8;

//   data = [
//     {
//       "name": "Russia",
//       "flag": "f/f3/Flag_of_Russia.svg",
//       "area": 17075200,
//       "population": 146989754
//     },
//     {
//       "name": "France",
//       "flag": "c/c3/Flag_of_France.svg",
//       "area": 640679,
//       "population": 64979548
//     },
//     {
//       "name": "Germany",
//       "flag": "b/ba/Flag_of_Germany.svg",
//       "area": 357114,
//       "population": 82114224
//     },
//     {
//       "name": "Portugal",
//       "flag": "5/5c/Flag_of_Portugal.svg",
//       "area": 92090,
//       "population": 10329506
//     },
//     {
//       "name": "Canada",
//       "flag": "c/cf/Flag_of_Canada.svg",
//       "area": 9976140,
//       "population": 36624199
//     },
//     {
//       "name": "Vietnam",
//       "flag": "2/21/Flag_of_Vietnam.svg",
//       "area": 331212,
//       "population": 95540800
//     },
//     {
//       "name": "Brazil",
//       "flag": "0/05/Flag_of_Brazil.svg",
//       "area": 8515767,
//       "population": 209288278
//     },
//     {
//       "name": "Mexico",
//       "flag": "f/fc/Flag_of_Mexico.svg",
//       "area": 1964375,
//       "population": 129163276
//     },
//     {
//       "name": "United States",
//       "flag": "a/a4/Flag_of_the_United_States.svg",
//       "area": 9629091,
//       "population": 324459463
//     },
//     {
//       "name": "India",
//       "flag": "4/41/Flag_of_India.svg",
//       "area": 3287263,
//       "population": 1324171354
//     },
//     {
//       "name": "Indonesia",
//       "flag": "9/9f/Flag_of_Indonesia.svg",
//       "area": 1910931,
//       "population": 263991379
//     },
//     {
//       "name": "Tuvalu",
//       "flag": "3/38/Flag_of_Tuvalu.svg",
//       "area": 26,
//       "population": 11097
//     },
//     {
//       "name": "China",
//       "flag": "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
//       "area": 9596960,
//       "population": 1409517397
//     }
// ]
  countries!: { name: string; flag: string; area: number; population: number; }[];
  allCountries!: { name: string; flag: string; area: number; population: number; }[];
  dateObject: { date: number; month: string; year: number; };
  game: any;
  timings?: any[];
  currentDate: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    
    this.dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };
  }

  ngOnInit(): void {

    const game = this.route.snapshot.paramMap.get('game');

    console.log('game from the url inside the route', game);
    
    this.getTheGame(game);
    this.getTableOfSpecificGame(game);
    // this.collectionSize = this.data.length;
    // this.countries = this.data;
    // this.allCountries = this.countries;
  }

  getTheGame(game :any) {
    this.dataService.getSingleGame('single', game).on('value', (snapshot) => {
      console.log('snapshot of the game', snapshot.val());
      this.game = snapshot.val();
    })
  }

  getTableOfSpecificGame(game :any) {
    console.log('game', game);
    this.dataService.getSingleGameDataTable('single', game, this.dateObject).on('value', (snapshot) => {
      console.log('snapshot for the table', snapshot.val());

      const gameData = snapshot.val();
      if(Object.keys(gameData).includes('time_slots')) {
        const timings = Object.keys(gameData['time_slots']).map((gameObj) => {
          return gameData['time_slots'][gameObj];
        })
  
        console.log('timings', timings);
        this.timings = timings;
      } else {
        this.timings = [];
      }
     
    })
  }

  getDataPreviousDate() {
    // const currentDate = this.currentDate;

    // const dateObject = {
    //   date: moment().subtract(1,'days').date(),
    //   month: moment().format('MMM'),
    //   year: moment().year(),
    // }

  }

  getDataNextDate() {

  }
}
