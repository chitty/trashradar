import { Injectable } from '@angular/core';

import { Entity } from './entity.model';
import { ModelService } from '../model';
import { DjangoClientService } from '../django-client';

@Injectable()
export class EntityService extends ModelService<Entity> {

  /**
   * Creates an instance of the ComplaintService
   *
   * @param {DjangoClientService} apiHttp
   */
  constructor(apiHttp: DjangoClientService) {
    super('/api/v1/entities', apiHttp);
  }

}
