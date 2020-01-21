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
  Monsters: any;
  Points: number;

  constructor(private modalController: ModalController, private data: DataService) {
    this.data.get("monsters").subscribe(res => {
      this.Monsters = res;
      this.Points = 10;
      console.log(this.Monsters);
    })
  }

  async setStats(mob: any) {
    console.log(mob);

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps : {
        'Monster': mob,
        'Points': this.Points,
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    mob = data;
    console.log("Data:" + data);

  }

}
