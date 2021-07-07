import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  // bookForm: FormGroup;
  bookForm = this.formBuilder.group({
    'isbn': [null, Validators.required],
    'title': [null, Validators.required],
    'description': [null, Validators.required],
    'author': [null, Validators.required],
    'publisher': [null, Validators.required],
    'published_year': [null, Validators.required]
  });
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.api.getBook(this.api.getBookId())v
      .subscribe(data => {
        this.bookForm.patchValue(data);
      });
  }
  updateBook(data) {
    this.api.updateBook(this.api.getBookId(), data)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
