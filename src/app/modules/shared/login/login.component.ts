import { Component, OnInit } from '@angular/core';
import DataModel from '../../../models/dataModel';
import { DataService } from '../../../services/data.service';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.saveTutorial();
  }

  saveTutorial(): void {
    // const payload = {
    //   key: '1',
    //   title: 'Hey hello'
    // };

    // this.dataService.create(payload).then(() => {
    //   console.log('Created new item successfully!');
    //   this.submitted = true;
    // });
  }

  newTutorial(): void {
    // this.submitted = false;
    // this.data = new DataModel();
  }

  getData() {
    // this.dataService
    //   .getAll()
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
    //     )
    //   )
    //   .subscribe((data) => {
    //      console.log('data', data);
    //   });
  }

  signIn() {
    this.router.navigate(['admin/home'])
  }
}
