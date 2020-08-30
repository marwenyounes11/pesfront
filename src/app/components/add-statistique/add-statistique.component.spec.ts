import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatistiqueComponent } from './add-statistique.component';

describe('AddStatistiqueComponent', () => {
  let component: AddStatistiqueComponent;
  let fixture: ComponentFixture<AddStatistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
