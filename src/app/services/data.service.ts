import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Database;

  constructor(private db: AngularFireDatabase) {
    this.dbRef = this.db.database;
  }


  getAllGames(gametype: string) {
    return this.dbRef.ref(`${this.dbPath}/games/${gametype}`);
  }

  extractDataTable(gametype :string,dateObject :any) {
    // sattaking/tables/oct-2021
   
    console.log('check', `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}`)
    return this.dbRef.ref(`${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}`);
  }
}