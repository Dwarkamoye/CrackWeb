import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
data:any;
  dropdownvalue: string;
  constructor(
    private http: HttpClient) {}

  selectedLevel = {id: '10' , name: 'Person'};
  entity: Array <object> = [
    { id: 1, name:'Book'},
    {id:2 , name:'BookSeries'},
    { id:3, name :'EducationalOrganization'},
    { id:5, name:'GovernmentOrganization'},
    { id:6, name:'Movie'},
    { id:7, name:'MovieSeries'},
    { id:8, name:'MusicGroup'},
    { id:9, name:'MusicRecording'},
    { id:10, name:'Person'},
    { id:11, name:'Place'},
    { id:12, name:'SportsTeam'},
    { id:13, name:'TVEpisode'},
    { id:14, name:'TVSeries'},
    { id:15, name:'VideoGame'},
    { id:4, name:'VideoGameSeries'},
    { id:4, name:'WebSite'},
    ];
  selected() {
    this.dropdownvalue = this.selectedLevel.name;
  }

  ngOnInit() {
    this.search();
  }
search(){
    const API_KEY ='AIzaSyBCCDbKZPZiV5rCP8Uit3EHoaYQr8hDKgI';
    const inputValue = (document.getElementById('something') as HTMLInputElement).value;
    var url='https://kgsearch.googleapis.com/v1/entities:search?query=' +inputValue+ '&indent=true&languages=en&limit=3&prefix=true&types='+this.dropdownvalue+'&alt=json&key='+API_KEY;
    this.http.get(url).subscribe((data: any ) => {
      this.data = data.itemListElement
   console.log(data.itemListElement);
  });
  }
}

