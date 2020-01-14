import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() HpMax: number;

  constructor(private modalCtrl: ModalController, navParams: NavParams ) {
    this.HpMax = navParams.get('HpMax');
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss(
        'HpMax'
    )
  }
}
