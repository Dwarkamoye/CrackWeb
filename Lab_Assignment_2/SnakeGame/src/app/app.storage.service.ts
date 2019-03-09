import { Injectable } from '@angular/core';

@Injectable()
export class BestScoreManager {

  private bestScore = 'snakescore';
  time ;
  
  public setTime(timeout){
    this.time = timeout;
  }
  public getTime(){
    return this.time;
  }

  public store(score: any) {
    localStorage.setItem(this.bestScore, score);
  }

  public retrieve() {
    let score = localStorage.getItem(this.bestScore);
    console.log(Number(score));
    if(score){
      return score;
    }
    else{
      return 0;
    }
  }
}
