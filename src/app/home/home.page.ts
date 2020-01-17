import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  HpMax: number;
  MobName: string;
  MobPic: string;
  StrengthMax: number = 5;
  ToughnessMax: number = 5;
  SmartnessMax:number = 5;
  MobDescription: string;
  MobAbilityId: number;
  Monsters: any;

  constructor(private modalController: ModalController, private data: DataService) {
    this.data.get("monsters").subscribe(res => {
      this.Monsters = res;
      console.log(this.Monsters);
    })
  }

  async setStats(mob: any) {
    console.log(mob);

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps : {
        /*'HpMax': this.HpMax,
        'MobName':this.MobName,
        'MobPic':this.MobPic,
        'StrengthMax':this.StrengthMax,
        'ToughnessMax':this.ToughnessMax,
        'SmartnessMax':this.SmartnessMax,
        'MobDescription':this.MobDescription,
        'MobAbilityId':this.MobAbilityId*/
        'Monster': mob,
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    mob = data;
    console.log("Data:" + data);

  }

}
