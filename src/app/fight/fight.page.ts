import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {
  Monster = new Monster();
  Intruders: any;
  Win_cpt: number;
  Run_cpt: number;
  Current_intruder = new Intruder();

  constructor(private router: Router, private data: DataService, navCtrl?: NavController ) {
    this.Monster = this.router.getCurrentNavigation().extras.state.Monster;
    this.data.get("intruders").subscribe(res => {
      this.Intruders = res;
      console.log(this.Intruders);
      this.pickEnemy();
    });
    this.Win_cpt = 1;
    this.Run_cpt = 0;
  }

  ngOnInit() {

  }

  delay(ms: number){
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  pickEnemy(){
    let goodLvl: boolean = false;
    let rand: number;
    while (goodLvl == false){
      rand = (Math.floor(Math.random() * (0 - this.Intruders.length)) + this.Intruders.length);
      this.Current_intruder = this.Intruders[rand];
      if(this.Current_intruder.Lvl_min <= (this.Win_cpt + 1)){
        console.log(this.Current_intruder);
        goodLvl = true;
      }
    }

  }

}

export class Monster{
  ID: number;
  Name: string;
  Hp_init: number;
  Hp_current: number;
  Strength_init: number;
  Toughness_init: number;
  Smartness_init: number;
  Picture: string;
}

export class Intruder{
  ID: number;
  Name: string;
  Hp_init: number;
  Hp_current: number;
  Strength_init: number;
  Toughness_init: number;
  Smartness_init: number;
  Lvl_min: number;
  Picture: string;
}


