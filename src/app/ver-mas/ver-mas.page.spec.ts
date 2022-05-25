import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerMasPage } from './ver-mas.page';

describe('VerMasPage', () => {
  let component: VerMasPage;
  let fixture: ComponentFixture<VerMasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerMasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
