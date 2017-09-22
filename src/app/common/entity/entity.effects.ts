import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { EntityService } from './entity.service';
import { EntityActions } from './entity.actions';
import { Entity } from './entity.model';

@Injectable()
export class EntityEffects {
  @Effect()
  public loadEntities$: Observable<Action> = this.actions$
    .do((action) => console.log(`Received ${action.type}`))
    .filter((action) => action.type === EntityActions.LOAD_ENTITIES)
    // .ofType(EntityActions.LOAD_ENTITIES)
    .switchMap(() => this.entityService.getAllPages())
      .map((entities) => this.entityActions.loadEntitiesSuccess(entities))
      .catch((error) => of(this.entityActions.loadEntitiesFail(error))
  );

  constructor(
    private actions$: Actions,
    private entityService: EntityService,
    private entityActions: EntityActions,
    private store: Store<any>,
  ) {}
}
