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
  Monster: any;
  Points: number;

  constructor(private modalCtrl: ModalController, navParams: NavParams ) {
    this.Monster = navParams.get('mob');
    this.Points = navParams.get('Points');
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss(
        'mob'
    )
  }

  modStat(amount: number, stat: string){
      console.log("modStat says : " + amount + " " + stat);
      //Check for stat to change
      if(stat == "Strength"){
          this.Points += amount;
          this.StrengthMax += amount;

      }else if(stat == "HP"){
          this.Points += amount;
      }else if(stat == "Toughness"){
          this.Points += amount;
      }else if(stat == "Smartness"){
          this.Points += amount;
      }else{
        console.log("Dude, " + stat + " is not a Monster Stat!");
      }
  }

}
