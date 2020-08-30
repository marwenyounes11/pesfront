import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRessourceComponent } from './list-ressource.component';

describe('ListRessourceComponent', () => {
  let component: ListRessourceComponent;
  let fixture: ComponentFixture<ListRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
