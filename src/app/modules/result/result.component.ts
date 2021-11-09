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
  collectionSize: number = 0;
  currentRate = 8;


  // countries!: { name: string; flag: string; area: number; population: number; }[];
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

  //  this.collectionSize = this.countries.length;
    
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
        // const slicedArray = timings.slice();
        // const reverseArray = slicedArray.reverse();
        // console.log('reverse the timings', reverseArray);
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
