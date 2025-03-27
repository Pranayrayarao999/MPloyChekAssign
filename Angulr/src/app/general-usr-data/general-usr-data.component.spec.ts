import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUsrDataComponent } from './general-usr-data.component';

describe('GeneralUsrDataComponent', () => {
  let component: GeneralUsrDataComponent;
  let fixture: ComponentFixture<GeneralUsrDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralUsrDataComponent]
    });
    fixture = TestBed.createComponent(GeneralUsrDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
