import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FightPage } from './fight.page';

describe('FightPage', () => {
  let component: FightPage;
  let fixture: ComponentFixture<FightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
