import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CandidatureService } from './candidature.service';

describe('CandidatureService', () => {
  let service: CandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
        providers: [CandidatureService]
    });
    service = TestBed.inject(CandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
