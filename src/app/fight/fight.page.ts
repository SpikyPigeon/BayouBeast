import { Component, OnInit } from '@angular/core';
import {ToastController, NavController, NavParams} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {IError} from 'protractor/built/exitCodes';

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


  constructor(private router: Router, private data: DataService, public toastController: ToastController, navCtrl?: NavController ) {
    // À VÉRIFIER
    try {
      this.Monster = this.router.getCurrentNavigation().extras.state.Monster;
      this.data.get("intruders").subscribe(res => {
        this.Intruders = res;
        console.log(this.Intruders);
        this.pickEnemy();
        this.Monster.Hp_current = this.Monster.Hp_init;
      });
      this.Win_cpt = 0;
      this.Run_cpt = 0;
    }catch (e) {
      this.router.navigate(["home"]);
    }
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
        this.Current_intruder.Hp_current = this.Current_intruder.Hp_init;
      }
    }
    this.cpt_turns = 1;
  }

  rollHitDamage(Attacker: any, Defender: any){
    let damage: number;
    let strike: number;
    let defense: number;

    defense = Math.floor(0.6 * Defender.Toughness_init);
    strike = (Math.floor(Math.random() * (1 - Attacker.Strength_init)) + Attacker.Strength_init);
    //strike = Math.floor((Attacker.Strength_init * Attacker.Strength_init) / (Attacker.Strength_init + Defender.Toughness_init))
    if(Math.floor(Math.random() * (1 - 100)) + 100 <= Attacker.Smartness_init){
      strike = strike * 2;
      this.triggerCrit();
    }
    console.log("Attack = " + strike + " => Defense = " + defense);
    damage = strike - defense;
    if(damage < 0){
      damage = 0;
    }
    this.triggerDamage(0, Attacker.Name, Defender.Name);
    console.log("Total Damage Dealt = " + damage);
    Defender.Hp_current -= damage;
    if(Defender.Hp_current < 0){
      Defender.Hp_current = 0;
    }
  }

  async triggerCrit(){
    const crit_toast = await this.toastController.create({
      message: 'Critical hit!',
      color: 'warning',
      duration: 2000,
      position: 'top'
    });
    await crit_toast.present();
  }

  async triggerDamage(damage: number, attacker: string, defender: string){
    const damage_toast = await this.toastController.create({
      message: attacker + " dealt " + damage + " damage to " + defender,
      color: "dark",
      duration: 2000
    });
    await damage_toast.present();
  }

  async triggerWin(){
    this.Monster.Hp_current += (this.Monster.Hp_current * 0.2);
    if(this.Monster.Hp_current > this.Monster.Hp_init){
      this.Monster.Hp_current = this.Monster.Hp_init;
    }
    this.Win_cpt++;
    if(this.Win_cpt == 3){
      this.Badge_Warrior = true;
      const warrior_toast = await this.toastController.create({
        message: "You were awarded the Beast Badge!",
        color: "success",
        position: 'middle',
        buttons: ['RAWR!!']
      });
      await warrior_toast.present();
    };
    const win_toast = await this.toastController.create({
      message: 'You won the fight! Click here to continue',
      color: 'success',
      buttons: [{
        text: 'NEXT',
        side: "end",
        handler: () => {
          this.pickEnemy();
          this.stuffHappening = false;
        }
      }]
    });
    await win_toast.present();
  }

  async triggerGameOver(){
      const gg_toast = await this.toastController.create({
        message: 'You died and lost your swamp.',
        color: 'danger',
        buttons: [{
          text: 'RESPAWN',
          side: 'end',
          handler: () => {
            this.router.navigate(["home"]);
          }
        }]
      });
      await gg_toast.present();
  }

  async attack(){
    this.stuffHappening = true;
    this.rollHitDamage(this.Monster, this.Current_intruder);
    if(this.Current_intruder.Hp_current == 0){
      this.triggerWin();
      return;
    }
    await this.delay(1200);
    this.rollHitDamage(this.Current_intruder, this.Monster);
    if(this.Monster.Hp_current == 0){
      this.triggerGameOver();
      return;
    }
    this.stuffHappening = false;
    this.cpt_turns += 1;
  }

  async escape(){
    this.stuffHappening = true;
    if(Math.floor(Math.random() * (1 - 80)) + 80 > this.Monster.Smartness_init){
      this.triggerEscape(false);
      this.rollHitDamage(this.Current_intruder, this.Monster);
      if(this.Monster.Hp_current == 0){
        this.triggerGameOver();
      }
    }else{
      this.triggerEscape(true);
    }
    this.stuffHappening = false;
  }

  async triggerEscape(escaped: boolean){
    if(escaped == false){
      const esc_toast = await this.toastController.create({
        message: "You couldn't run away!",
        color: 'danger',
        position: 'top',
        duration: 2000
      });
      await esc_toast.present();
    }else{
      const esc_toast = await this.toastController.create({
        message: "You managed to run away for dear life.",
        color: 'primary',
        position: 'top',
        duration: 2000
      });
      await esc_toast.present();
      this.pickEnemy();
      this.Run_cpt++;
      if(this.Run_cpt == 3){
        this.Badge_Coward = true;
        const coward_toast = await this.toastController.create({
          message: "You were awarded the Coward Badge...",
          color: 'medium',
          position: 'middle',
          buttons: ['Yay...?']
        });
        await coward_toast.present();
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


