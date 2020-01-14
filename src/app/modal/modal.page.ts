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


  constructor(private modalCtrl: ModalController, navParams: NavParams ) {
    this.HpMax = navParams.get('HpMax');
    this.MobName = navParams.get('MobName');
    this.StrengthMax = navParams.get('StrengthMax');
    this.ToughnessMax = navParams.get('ToughnessMax');
    this.SmartnessMax = navParams.get('SmartnessMax');
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss(
        'HpMax'

    )
  }
}
