import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoseeComponent } from './nosee.component';

describe('NoseeComponent', () => {
  let component: NoseeComponent;
  let fixture: ComponentFixture<NoseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
