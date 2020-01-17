import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() HpMax: number;
  @Input() MobName: string;
  @Input() StrengthMax: number;
  @Input() ToughnessMax: number;
  @Input() SmartnessMax: number;
  MobDescription: string;
  MobPic: string;
  Monster: any;

  constructor(private modalCtrl: ModalController, navParams: NavParams ) {
    this.Monster = navParams.get('mob');

  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss(
        'mob'
    )
  }
}

/*export class Monster{
  HpMax:number;
}*/
