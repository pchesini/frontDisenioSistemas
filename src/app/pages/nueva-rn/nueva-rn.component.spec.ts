import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRnComponent } from './nueva-rn.component';

describe('NuevaRnComponent', () => {
  let component: NuevaRnComponent;
  let fixture: ComponentFixture<NuevaRnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaRnComponent]
    });
    fixture = TestBed.createComponent(NuevaRnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
