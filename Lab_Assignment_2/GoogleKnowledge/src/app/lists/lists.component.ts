import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  listsdata = {};
  constructor(private service : ServicesService) { }
  ngOnInit() {
    this.listsdata=this.service.getData();
    console.log(this.listsdata);
  }
  itemClicked(item){
    window.open(item.result.detailedDescription.url, '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=100,width=1200,height=800');
  }
}
