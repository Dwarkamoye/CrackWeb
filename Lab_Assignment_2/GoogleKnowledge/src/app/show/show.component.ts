import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  data: any;
  dropdownvalue: string;

  constructor(
    private http: HttpClient, private router: Router, private service: ServicesService) {
  }

  limit = 10;
  entity: Array<object> = [
    {id: 1, name: 'Book'},
    {id: 2, name: 'BookSeries'},
    {id: 3, name: 'EducationalOrganization'},
    {id: 4, name: 'WebSite'},
    {id: 5, name: 'GovernmentOrganization'},
    {id: 6, name: 'Movie'},
    {id: 7, name: 'MovieSeries'},
    {id: 8, name: 'MusicGroup'},
    {id: 9, name: 'MusicRecording'},
    {id: 10, name: 'Person'},
    {id: 11, name: 'Place'},
    {id: 12, name: 'SportsTeam'},
    {id: 13, name: 'TVEpisode'},
    {id: 14, name: 'TVSeries'},
    {id: 15, name: 'VideoGame'}
  ];

  selected(item) {
    this.dropdownvalue = item.name;
  }

  ngOnInit() {
    // this.search();
  }

  search() {
    const API_KEY = 'AIzaSyDoLoA-wOheATb0jJD0KgxMKyTxg4cc-0E';
    const inputValue = (document.getElementById('something') as HTMLInputElement).value;
    let url = 'https://kgsearch.googleapis.com/v1/entities:search?query=' + inputValue +
      '&indent=true&languages=en&limit=' + this.limit + '&prefix=true&types=' + this.dropdownvalue + '&alt=json&key=' + API_KEY;
    this.service.gethttpData(url)
      .subscribe((data: any) => {
          console.log(data);
          this.data = data.itemListElement;
          this.service.setData(this.data);
          this.router.navigateByUrl('/lists');
        },
        error => console.log(error) // error path);
      );
  }
}
