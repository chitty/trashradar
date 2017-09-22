import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class EntityActions {
  public static GET_ENTITIES = '[Entity] GET_ENTITIES';
  public static GET_ENTITY = '[Entity] GET_ENTITY';
  public static SEARCH_QUERY = '[Entity] SEARCH_QUERY';
  public static LOAD_ENTITIES = '[Entity] LOAD_ENTITIES';
  public static LOAD_ENTITIES_SUCCESS = '[Entity] LOAD_ENTITIES_SUCCESS';
  public static LOAD_ENTITIES_FAIL = '[Entity] LOAD_ENTITIES_FAIL';

  public getEntities = ActionCreatorFactory.create(EntityActions.GET_ENTITIES);
  public getEntity = ActionCreatorFactory.create(EntityActions.GET_ENTITY);
  public searchQuery = ActionCreatorFactory.create(EntityActions.SEARCH_QUERY);
  public loadEntities = ActionCreatorFactory.create(EntityActions.LOAD_ENTITIES);
  public loadEntitiesSuccess = ActionCreatorFactory.create(EntityActions.LOAD_ENTITIES_SUCCESS);
  public loadEntitiesFail = ActionCreatorFactory.create(EntityActions.LOAD_ENTITIES_FAIL);
}
