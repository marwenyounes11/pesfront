import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CandidatService } from './candidat.service';

describe('CandidatService', () => {
  let service: CandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
        providers: [CandidatService]
    });
    service = TestBed.inject(CandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
