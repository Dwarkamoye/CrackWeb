import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*title = 'Nearby'
  name: string = '';
  url: string = '';
  date: string = '';
  clientId = 'ZTDW3HXJRV0COJVSFWRB3FVKBTD0KC2LUVJK1NVANE4JOA1K';
  clientSecret = 'SIW2O2TQEID3DHEREZZT10FSGDIJPTOBKA2GJJPBOXFDNCEN';*/
//private service: ServiceService
  constructor() {
  }

  /*search() {
    this.date = this.yyyymmdd();
    this.url = 'https://api.foursquare.com/v2/venues/explore?cat=restaurant&near='+this.name+'&client_id='+this.clientId+'&client_secret='+this.clientSecret+'&v='+this.date+'';
    this.service.getConfig(this.url)
      .subscribe((data) => {
        console.log(data['response']['groups'][0]['items']);
      },
        error => console.log(error) // error path
        );
  }
  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    return '' + y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
  }*/
}
