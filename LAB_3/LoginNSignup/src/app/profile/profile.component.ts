import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dataItem;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }
  ngOnInit() {
    console.log('init username'+ this.route.snapshot.params['username']);
    this.getBookDetails(this.route.snapshot.params['username']);
  }

  getBookDetails(username) {
    console.log('profile id '+ username);
    this.api.getUser(username)
      .subscribe(data => {
        this.dataItem = data;
        console.log('profile data' + data);
        console.log('profile user data' + this.dataItem)

      });
  }


}
