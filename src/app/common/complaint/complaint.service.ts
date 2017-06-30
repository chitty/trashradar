import { Injectable } from '@angular/core';

import { Complaint } from './complaint.model';
import { ModelService } from '../model';
import { DjangoClientService } from '../django-client';

@Injectable()
export class ComplaintService extends ModelService<Complaint> {

  /**
   * Creates an instance of the ComplaintService
   *
   * @param {DjangoClientService} apiHttp
   */
  constructor(apiHttp: DjangoClientService) {
    super('/api/1/people/', apiHttp);
  }

}
