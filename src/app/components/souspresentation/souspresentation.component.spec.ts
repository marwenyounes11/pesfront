import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouspresentationComponent } from './souspresentation.component';

describe('SouspresentationComponent', () => {
  let component: SouspresentationComponent;
  let fixture: ComponentFixture<SouspresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouspresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouspresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
