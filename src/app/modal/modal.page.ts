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
  baseStats: Array<number> = new Array<number>();

  constructor(private modalCtrl: ModalController, navParams: NavParams ) {
    this.Monster = navParams.get('mob');
    this.Points = navParams.get('Points');
  }

  ngOnInit() {
      this.baseStats[0] = this.Monster.Hp_init;
      this.baseStats[1] = this.Monster.Strength_init;
      this.baseStats[2] = this.Monster.Toughness_init;
      this.baseStats[3] = this.Monster.Smartness_init;
  }

  closeModal() {
    this.modalCtrl.dismiss(
        'mob'
    )
  }

  modStat(amount: number, stat: string){
      //Check for stat to change
      if(stat == "Strength"){
          this.Points -= amount;
          this.Monster.Strength_init += amount;


      }else if(stat == "HP"){
          this.Points -= amount;
          this.Monster.Hp_init += amount;



      }else if(stat == "Toughness"){
          this.Points -= amount;
          this.Monster.Toughness_init += amount;


      }else if(stat == "Smartness"){
          this.Points -= amount;
          this.Monster.Smartness_init += amount;


      }
  }

  getStatForBar(amount: number){
      return (amount / 80);
  }

  checkIfPoints(mode: string, min?: number, current?: number){
      if(mode == "= 0" && this.Points == 0){
        return true;
      }
      else if(mode == "> 0" && this.Points > 0){
          return true;
      }
      else if(mode == "= 10"){
          if(current <= this.baseStats[min]){
              return true;
          }
      }
      else{
          return false;
      }
  }
}
