import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DjangoClientService } from '../django-client';
import { EntityService } from './entity.service';

describe('EntityService', () => {
  let mockBackend: MockBackend;
  let entityService: EntityService;
  let apiClient: DjangoClientService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new DjangoClientService(mockBackend, options);
    entityService = new EntityService(apiClient);
  });

  it('should create', () => {
    expect(entityService).toBeTruthy();
  });
});
