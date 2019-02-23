import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../services/services/transfer-data.service';
import { ViewChild } from '@angular/core';
// @ts-ignore
import { } from '@types/googlemaps';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locationData = {};
  constructor(private transferData:TransferDataService) { }
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  ngOnInit() {
    this.locationData = this.transferData.getData();
    console.log("Locations...");
    console.log(this.locationData);
    var lt = this.locationData[0].venue.location.lat;
    var ln = this.locationData[0].venue.location.lng;
    var nm = this.locationData[0].venue.name;
    this.viewLocation(lt,ln,nm);
  }
  viewLocation(lat,long,name)
  {
    var mapProp = {
      center: new google.maps.LatLng(lat, long),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    var marker = new google.maps.Marker({
      position: {lat:lat,lng:long},
      map: this.map,
      title: name
    });
  }
}
