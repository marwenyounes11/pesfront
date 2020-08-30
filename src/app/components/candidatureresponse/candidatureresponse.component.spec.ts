import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureresponseComponent } from './candidatureresponse.component';

describe('CandidatureresponseComponent', () => {
  let component: CandidatureresponseComponent;
  let fixture: ComponentFixture<CandidatureresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatureresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatureresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
