import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textitem: any;
  dropdownvalue: string;
  constructor(private http: HttpClient) {}

  selectedLevel = {id: 'kn' , name: 'Kannada'};
  data: Array <object> = [
    {id: 'kn' , name: 'Kannada'},
    {id: 'ja', name: 'Japanese'},
    {id: 'de', name: 'German'},
    {id: 'ar', name: 'Arabic'},
    {id: 'te', name: 'Telugu'},
    {id: 'hi', name: 'Hindi'},
    {id: 'it', name: 'Italian'}
  ];
  selected() {
    this.dropdownvalue = this.selectedLevel.id;
  }

translate() {
  const key = 'trnsl.1.1.20190222T204340Z.03c6cc9dd77fcc8f.67a0ab451321efd57d36bf6af879ae22af7388b1';
  const inputValue = (document.getElementById('clear_this') as HTMLInputElement).value;
  const  url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key +
    '&text=' + inputValue + '&lang=' + this.dropdownvalue + '&format=plain';
  this.http.get(url).subscribe((data: any ) => {
    this.textitem = data.text[0];
    return this.textitem;
    });
}
}
