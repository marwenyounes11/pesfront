import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetenariatsComponent } from './paretenariats.component';

describe('ParetenariatsComponent', () => {
  let component: ParetenariatsComponent;
  let fixture: ComponentFixture<ParetenariatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParetenariatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetenariatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
