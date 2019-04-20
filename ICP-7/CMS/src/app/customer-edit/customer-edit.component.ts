import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  submitted = false;
  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthday: ['', Validators.required],
    lastContact: ['', Validators.required],
    customerLifetimeValue: ['', Validators.required],
  });

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }
  // getter for form fields
  get f() {
    return this.customerForm.controls;
  }

  ngOnInit() {
  //  this.getCustomer(this.route.snapshot.params['id']);
    // alert();
    console.log("sbcasvascvdhjcbvds,hj,cvascgsdghcjadbshjcabv");
    this.getCustomer(this.api.getData());
  }

  getCustomer(id) {
    /*** Get the Customer Details*/
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log("in edit component data");
        console.log(data);
        data.firstName = data.name.first;
        data.lastName = data.name.last;
       this.customerForm.patchValue(data);
        // this.customer = data;
      });
  }

  onSubmit() {
    /*** On form submit update the customer details*/
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    let customer: object = {};
    customer['customerID'] = 15;
    customer['name'] = {
      first: this.customerForm.value.firstName,
      last: this.customerForm.value.lastName
    };
    customer['gender'] = this.customerForm.value.gender;
    customer['birthday'] = this.customerForm.value.birthday;
    customer['lastContact'] = this.customerForm.value.lastContact;
    customer['customerLifetimeValue'] = this.customerForm.value.customerLifetimeValue;
    console.log(" customer edit");
    console.log(customer);

    this.api.updateCustomer(this.api.getData(),customer)
      .subscribe(res => {
        console.log("In edit res");
        console.log(res);
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
