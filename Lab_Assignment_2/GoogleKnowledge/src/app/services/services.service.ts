import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  private data;
  gethttpData(url) {
    return this.http.get(url);
  }
  setData(data)
  {
    this.data = data;
  }
  getData()
  {
    return this.data;
  }
}
