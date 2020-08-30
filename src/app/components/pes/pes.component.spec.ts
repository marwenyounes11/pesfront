import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesComponent } from './pes.component';

describe('PesComponent', () => {
  let component: PesComponent;
  let fixture: ComponentFixture<PesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
