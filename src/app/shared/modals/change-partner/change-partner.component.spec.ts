import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePartnerComponent } from './change-partner.component';

describe('ChangePartnerComponent', () => {
  let component: ChangePartnerComponent;
  let fixture: ComponentFixture<ChangePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
