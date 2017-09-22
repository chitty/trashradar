import { ActionReducer, Action } from '@ngrx/store';

import { Entity } from './entity.model';
import { EntityState, initialEntityState } from './entity.state';
import { EntityActions } from './entity.actions';

export const EntityReducer: ActionReducer<EntityState> = (state = initialEntityState, action: Action) => {
  switch (action.type) {
    case EntityActions.GET_ENTITIES:
      return { ...state, selectedEntityId: null };

    case EntityActions.GET_ENTITY: {
      const entity: Entity = action.payload;

      return {
        ids: [ entity.id ],
        entities: {
          [entity.id]: entity
        },
        selectedEntityId: entity.id,
      };
    }

    case EntityActions.LOAD_ENTITIES_SUCCESS: {
      const entities: Entity[] = action.payload;
      const { entityEntities, entityIds } = entities.reduce((result, entity) => {
        result.entityEntities[entity.id] = entity;
        result.entityIds.push(entity.id);
        return result;
      }, { entityEntities: {}, entityIds: [] });

      return {
        ...state,
        ids: entityIds,
        entities: entityEntities,
      };
    }

    case EntityActions.LOAD_ENTITIES_FAIL:
      return { ...state, error: action.payload };

    default: {
      return state;
    }
  }
};
