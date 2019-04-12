import {Component, OnInit, HostBinding, HostListener} from '@angular/core';
import { BestScoreManager } from './app.storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'keyDirection($event)'
  }
})
export class AppComponent implements OnInit {
  title = 'SnakeGame';
  private status = 'Start';
  private elem: HTMLCanvasElement;
  private cont ;
  private heightOfBox: number;
  private widthOfBox: number;
  private box = 20;
  private snakeLength = 1;
  private snakeStart = 12;
  private direction = '';
  private game = 0;
  private prey = {x : 0 , y : 0};
  private ground: HTMLImageElement;
  private snake = [];
  private interval = 200;
  private score = 0;
  private bestscore ;
  constructor(public bestScoreService: BestScoreManager){
  }
  ngOnInit() {
    this.elem = <HTMLCanvasElement> document.getElementById('game');
    this.cont = this.elem.getContext('2d');
    this.heightOfBox = Number(this.elem.height);
    this.widthOfBox = Number(this.elem.width);
    this.ground = createImg({src: '../assets/image/ground.png'});
    this.bestscore = this.bestScoreService.retrieve();
    this.drawPrey();
    this.drawSnake();
    this.playGame();
  }
  startGame(todo){
    if(todo == 'direction' && this.status != 'Stop'){this.direction = 'RIGHT';}
    else{
      window.location.reload();
    }
  }
  drawSnake(){
    for (let j = 0; j < this.snakeLength; j++){
      this.snake[j] = {x: (this.snakeStart - j) * this.box, y: this.snakeStart * this.box};
    }
  }
  drawPrey(){
    this.prey = {
      x: Math.floor(Math.random() * (this.widthOfBox / this.box)) * this.box,
      y: Math.floor(Math.random() * (this.heightOfBox / this.box)) * this.box
    };
  }
  keyDirection(event){
    if (event.keyCode == 37 && this.direction != 'RIGHT') {this.direction = 'LEFT';}
    else if (event.keyCode == 38 && this.direction != 'DOWN') {this.direction = 'UP';}
    else if (event.keyCode == 39 && this.direction != 'LEFT') {this.direction = 'RIGHT';}
    else if (event.keyCode == 40 && this.direction != 'UP') {this.direction = 'DOWN';}
    this.status = 'Stop';
  }
  // check collision function
  checkCollision(snakeHead, snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
      if (snakeHead.x === snakeArray[i].x && snakeHead.y === snakeArray[i].y) {
        return true;
      }
    }
    return false;
  }
  gameover(){
    let av = localStorage.getItem('snakescore');
    if(av){
      let scorert = Number(av);
      this.score = scorert > this.score ? scorert : this.score;
    }
    this.bestScoreService.store(this.score);
    // this.bestScoreService.setTime([]);
    window.location.reload();
  }
  playGame() {// Draw snake
    let local = this;
    this.cont.drawImage(this.ground, 0, 0, this.widthOfBox, this.heightOfBox);
    for (let i = 0; i < this.snake.length; i++) {
      this.cont.fillStyle = (i === 0) ? 'black' : 'grey';
      this.cont.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
      this.cont.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }
    // draw prey
    this.cont.fillStyle = 'red';
    this.cont.fillRect(this.prey.x, this.prey.y, this.box, this.box);
    // old head position
    let prevHeadX = this.snake[0].x;
    let prevheadY = this.snake[0].y;
    // As per direction
    if (this.direction === 'LEFT') {prevHeadX = prevHeadX - this.box;}
    if (this.direction === 'RIGHT') {prevHeadX = prevHeadX + this.box;}
    if (this.direction === 'UP') {prevheadY = prevheadY - this.box;}
    if (this.direction === 'DOWN') {prevheadY = prevheadY + this.box;}

    if (prevHeadX == this.prey.x && prevheadY == this.prey.y) {
      this.score++;
      this.drawPrey();
    } else {
      // remove the tail
      this.snake.pop();
    }
    // add new head
    const newHead = {x: prevHeadX, y: prevheadY};
    // game over
    if (prevHeadX < 0 || prevHeadX === this.widthOfBox || prevheadY < 0 || prevheadY === this.heightOfBox
      || this.checkCollision(newHead, this.snake)) {
      this.gameover();
    }
    this.snake.unshift(newHead);
    this.game = setTimeout(() => {
      local.playGame();
    }, this.interval);
    this.bestScoreService.setTime(this.game);
  }
}
export interface CreateImgOptions {
  src: string;
}

export function createImg(options: CreateImgOptions): HTMLImageElement {
  let img = <HTMLImageElement> document.createElement("img")
  img.src = options.src;
  return img;
}

