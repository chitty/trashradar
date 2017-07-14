import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DjangoClientService } from '../django-client';
import { ComplaintService } from './complaint.service';

describe('ComplaintService', () => {
  let mockBackend: MockBackend;
  let complaintService: ComplaintService;
  let apiClient: DjangoClientService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new DjangoClientService(mockBackend, options);
    complaintService = new ComplaintService(apiClient);
  });

  it('should create', () => {
    expect(complaintService).toBeTruthy();
  });
});
