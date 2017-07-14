import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DjangoClientService } from '../django-client';
import { ModelService } from './model.service';

class TestType {
  public id?: number;
  public token?: string;
  public password?: string;
  public firstName?: string;
  public lastName?: string;
  public address1?: string;
  public address2?: string;
  public state?: string;
  public city?: string;
  public zipcode?: string;
  public country?: string;
  public company?: string;
  public website?: string;
  public phone?: string;
  public vat?: string;
}

describe('ModelService', () => {
  let mockBackend: MockBackend;
  let modelService: ModelService<TestType>;
  let apiClient: DjangoClientService;

  const modelUrl = '/model_url/';
  const query = { id: 10 };
  const element: TestType = { id: 10, token: 'token', city: 'NY' };
  const successBody: TestType = element;
  const successBodyList: [TestType] = [successBody, successBody];
  const successBodyPaginated = {
    next: 'watever',
    results: [1, 2, 3],
  };
  const errorBody = {
    status: 'Bad request',
    message: 'User could not be created with received data.',
    errors: [
    {
      field: 'username',
      message: 'This field may not be blank.'
    },
    {
      field: 'password',
      message: 'This field may not be blank.'
    },
    {
      field: 'email',
      message: 'This field may not be blank.'
    }
    ]
  };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseList = new Response(new ResponseOptions({
    body: JSON.stringify(successBodyList),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  const generateResponse = (body) => new Response(new ResponseOptions({
    body: JSON.stringify(body),
    status: 200,
    statusText: 'Success',
  }));

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new DjangoClientService(mockBackend, options);
    modelService = new ModelService<TestType>(modelUrl, apiClient);
  });

  it('should create', () => {
    expect(modelService).toBeTruthy();
  });

  /*
   * get()
   */
  it(`should return a single Observable<T> on get in case of success calling
      the underlying get method from DjangoClientService`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    spyOn(apiClient, 'get').and.callThrough();
    modelService.get('10').subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    expect(apiClient.get).toHaveBeenCalledWith(modelUrl + '10');
  });

  it('should rethrow the error on get in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.get('10').subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError, 'Error response does not match');
    });
  });

  /*
   * find()
   */
  it(`should return a list of Observable<T[]> on find in case of success calling
      the underlying get method from DjangoClientService`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseList);
    });

    spyOn(apiClient, 'get').and.callThrough();
    modelService.find(query).subscribe((result) => {
      expect(result).toEqual(successBodyList, 'Response does not match');
    });
    expect(apiClient.get).toHaveBeenCalledWith(modelUrl,
                                               new RequestOptions({params: query}));

  });

  it('should rethrow the error on find in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.find(query).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError, 'Error response does not match');
    });
  });

  /*
   * save()
   */
  it(`should return the element being saved in case of success and call DjangoClientService's
      post method on save when the element does not have an id`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    const newElement: TestType = { token: 'a_token' };
    spyOn(apiClient, 'post').and.callThrough();
    modelService.save(newElement).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    expect(apiClient.post).toHaveBeenCalledWith(modelUrl,
                                                new RequestOptions({body: newElement}));
  });

  it(`should call post method with FormData if form data flag was passed`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    spyOn(apiClient, 'post').and.callThrough();
    modelService.save(element, true).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    const formData = new FormData();
    Object.entries(element).forEach(([key, value]) => formData.append(key, value));
    expect(apiClient.post).toHaveBeenCalledWith(modelUrl, formData);
  });

  it(`should return the element being saved in case of success and call DjangoClientService's
      put method on save when the element has an id`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    spyOn(apiClient, 'put').and.callThrough();
    modelService.save(element).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    expect(apiClient.put).toHaveBeenCalledWith(modelUrl + element.id,
                                               new RequestOptions({body: element}));
  });

  it('should rethrow the error on save in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.save(element).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError, 'Error response does not match');
    });
  });

  /*
   * delete()
   */
  it(`should return an Observable<T> on delete in case of success calling
      the underlying delete method from DjangoClientService`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    spyOn(apiClient, 'delete').and.callThrough();
    modelService.delete(element).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    expect(apiClient.delete).toHaveBeenCalledWith(modelUrl + element.id);
  });

  it('should rethrow the error on delete in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.delete(element).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError, 'Error response does not match');
    });
  });

  describe('paging', () => {
    /*
    * getAllPages()
    */
    it('should not call getPages if there is no next page', () => {
      const expected = [1, 2, 3, 4];
      mockBackend.connections.subscribe((connection) => {
        const item = {
          ...successBody,
          next: null,
          results: expected };
        connection.mockRespond(generateResponse(item));
      });
      spyOn(modelService, 'getPages').and.callThrough();

      modelService.getAllPages(null)
        .subscribe((result: any) => {
          expect(modelService.getPages).not.toHaveBeenCalled();
          expect(result).toEqual(expected);
        });
    });

    it('should go through all available pages', () => {
      const expected = [];
      const totalPages = 4;
      let page = 0;
      mockBackend.connections.subscribe((connection) => {
        const item = { ...successBodyPaginated, results: [page] };
        expected.push(page);
        if (++page === totalPages) {
          item.next = null;
        }
        connection.mockRespond(generateResponse(item));
      });
      spyOn(modelService, 'getPages').and.callThrough();

      modelService.getAllPages(null)
        .subscribe((result) => {
          expect(result).toEqual(expected);
          expect(modelService.getPages).toHaveBeenCalledTimes((totalPages - 1));
        });
    });
    /*
    * getPages()
    */
    it('should get all remaining pages', () => {
      const expected = [];
      const totalPages = 5;
      const startingPage = 2;
      let page = startingPage;
      mockBackend.connections.subscribe((connection) => {
        const item = { ...successBodyPaginated, results: [page] };
        expected.push(page);
        if (++page === totalPages) {
          item.next = null;
        }
        connection.mockRespond(generateResponse(item));
      });

      spyOn(modelService, 'getPages').and.callThrough();
      modelService.getPages('page')
        .toArray()
        .subscribe((result) => {
          expect(result).toEqual(expected);
          expect(modelService.getPages).toHaveBeenCalledTimes(totalPages - startingPage);
        });
    });
  });
});
