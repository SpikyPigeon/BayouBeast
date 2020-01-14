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
  HpMax: number = 5;
  StrengthMax: number = 5;
  ToughnessMax: number = 5;
  SmartnessMax:number = 5;
  MobName: string;
  MobDescription: string;
  MobPic: string;
  MobAbilityId: number;

  constructor(private modalController: ModalController, private data: DataService) {
    this.data.get("Monsters").subscribe(res => {
      this.HpMax = res[0];

      console.log(res + "/" + this.HpMax);

    })
  }

  checkInfo(mob: string) {
    console.log(mob + ' info');
  }

  async setStats(mob: string) {
    console.log(mob);

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps : {
        'HpMax': this.HpMax
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    this.HpMax = data.Hp;
    console.log(data);

  }

}
