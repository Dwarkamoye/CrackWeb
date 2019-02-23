import {Component} from '@angular/core';

//import {AfterViewInit} from 'angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Calculator';
  displayId = "display"; //Display and calculate final result
  arr = [];
//update display with input
  updateDisplay() {
    document.getElementById(this.displayId).innerText = this.arr.join(" ");
  };
//Add new input to end of most recent input
  handleNumber(number) {
    number = number.target.textContent;
    if (isNaN(this.arr[this.arr.length - 1])) {
      this.arr.push(number.toString());
    } else {
      this.arr[this.arr.length - 1] += number.toString();
    }
    this.updateDisplay();
  };

  handleOperator(operator) {
    operator = operator.target.textContent;
    if (!isNaN(this.arr[this.arr.length - 1])) {
      if (operator === ".") {
        if (!this.arr[this.arr.length - 1].includes(".")) {
          this.arr[this.arr.length - 1] += operator.toString();
        }
      } else {
        this.arr.push(operator);
      }
      this.updateDisplay();
    }
  };
//clear all data
  allClear(funcName) {
    this.arr = [];
    this.updateDisplay();
  };
//clear a single entry data
  clearEntry() {
    this.arr.pop();
    this.updateDisplay();
  };

  sumNumbers() {
    var total = eval(this.arr.join(" "));
    this.arr = [total];
    this.updateDisplay();
  };
};




