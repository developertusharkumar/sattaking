import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import DataModel from '../models/dataModel';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/sattaData';


  sattaDataRef :AngularFireList<DataModel>

  constructor(private db: AngularFireDatabase) {

    this.sattaDataRef = db.list(this.dbPath);
  }


  getAll(): AngularFireList<DataModel> {
    return this.sattaDataRef;
  }

  create(tutorial: DataModel): any {
    return this.sattaDataRef.push(tutorial);
  }

  // update(key: string, value: any): Promise<void> {
  //   return this.sattaDataRef.update(key, value);
  // }

  // delete(key: string): Promise<void> {
  //   return this.sattaDataRef.remove(key);
  // }

  // deleteAll(): Promise<void> {
  //   return this.sattaDataRef.remove();
  // }
}