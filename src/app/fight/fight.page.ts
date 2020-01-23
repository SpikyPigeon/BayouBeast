import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

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
  cpt_turns: number = 1;
  stuffHappening: boolean = false;
  Badge_Warrior: boolean = false;
  Badge_Coward: boolean = false;


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

  ngOnInit() { }

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
    this.cpt_turns = 1;
  }

  rollHitDamage(Attacker: any, Defender: any){
    let damage: number;
    let strike: number;
    let defense: number;
    let crit: boolean;

    defense = Math.floor(0.6 * Defender.Toughness_init);
    strike = (Math.floor(Math.random() * (1 - Attacker.Strength_init)) + Attacker.Strength_init);
    if(Math.floor(Math.random() * 10) <= Attacker.Smartness_init){
      strike = strike * 3;
      console.log("CRITICAL HIT! TRIPLE DAMAGE!");
    }
    console.log("Attack = " + strike + " => Defense = " + defense);
    damage = strike - defense;
    if(damage < 0){
      damage = 0;
    }
    console.log("Total Damage Dealt = " + damage);
    Defender.Hp_current -= damage;
    if(Defender.Hp_current < 0){
      Defender.Hp_current = 0;
    }
  }

  async attack(){
    this.stuffHappening = true;
    this.rollHitDamage(this.Monster, this.Current_intruder);
    //check if intruder is dead
    await this.delay(800);
    this.rollHitDamage(this.Current_intruder, this.Monster);
    //check if Monster is dead
    this.stuffHappening = false;
    this.cpt_turns += 1;
  }

  async escape(){
    this.stuffHappening = true;
    //roll smartness

    //if roll lost, intruder hits monster

    //if roll won, +1 run, check if coward badge, then pick new enemy
    //this.pickEnemy();

    this.stuffHappening = false;
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


