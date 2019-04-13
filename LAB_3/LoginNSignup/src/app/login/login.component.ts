import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  username: string = '';
  password:string='';
  user;
  flag:boolean;
  temp:boolean;
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }
  getUserDetails(username, password) {
    console.log('username hai bhai' + username);
    console.log('username hai bhai' + password);
    this.api.getUser(username)
      .subscribe(data => {
        console.log('userdata' + data)
        this.user = data;
        if (this.user.length == 0) {
          this.temp=true;
        }
        else {
          let pass = data[0].password;
          console.log('username login' + username);
          if (password == pass) {
            this.router.navigate(['/Profile', username]);
          } else {
            this.flag = true;
            this.temp = false;
          }
        }
      },(err) => {
        console.log(err);
      }
    );
  }
}
