import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { TransferDataService } from '../services/services/transfer-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Nearby';
  name: string = '';
  recipename: string = '';
  url: string = '';
  date: string = '';
  clientId = 'ZTDW3HXJRV0COJVSFWRB3FVKBTD0KC2LUVJK1NVANE4JOA1K';
  clientSecret = 'SIW2O2TQEID3DHEREZZT10FSGDIJPTOBKA2GJJPBOXFDNCEN';

  constructor(
    private service: ServiceService,
    private transferData:TransferDataService,
    private router:Router) {}


  ngOnInit() {
  }
  search() {
    this.date = this.yyyymmdd();
    this.url = 'https://api.foursquare.com/v2/venues/explore?cat=restaurant&recipe='+this.recipename+'&near='+this.name+'&client_id='+this.clientId+'&client_secret='+this.clientSecret+'&v='+this.date+'';
    this.service.getData(this.url)
      .subscribe((data) => {
          this.transferData.setData(data['response']['groups'][0]['items']);
          this.router.navigateByUrl('/locations');
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
  }

}
