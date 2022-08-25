import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Data } from '@angular/router';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './my-interceptor.service';

const testData: Data[] = [{ name: 'bob' }, { name: 'alice' }];

describe('PROVIDE_CONTENT_TYPE_HTTP_INTERCEPTOR', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true,}]
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('handles POST requests', (done) => {
    http.post('/data', {}).subscribe((data: any) => {
      console.log('POST REQUEST HAS FIRED');
      expect(data).toEqual(testData);
      done();
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
  });

  it('ignores GET requests', (done) => {
    http.get('/data').subscribe((data: any) => {
      console.log('GET REQUEST HAS FIRED');
      expect(data).toEqual(testData);
      done();
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData);
  });
});
