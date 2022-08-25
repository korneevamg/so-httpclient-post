import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api-service';

const testData = {data: 'some data'};

describe('Test ApiService', () => {
  let http: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    http = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('handles POST requests', (done) => {
    http.testPost().subscribe((data: any) => {
      console.log('POST REQUEST HAS FIRED');
      expect(data).toEqual(testData);
      done();
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
  });

  it('ignores GET requests', (done) => {
    http.testGet().subscribe((data: any) => {
      console.log('GET REQUEST HAS FIRED');
      expect(data).toEqual(testData);
      done();
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
  });
});
