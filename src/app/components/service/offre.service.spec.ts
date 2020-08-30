import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { OffreService } from './offre.service';

describe('OffreService', () => {
  let service: OffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [OffreService]
    });
    service = TestBed.inject(OffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
