import {
  inject,
  async,
} from '@angular/core/testing';

import { Entity } from './entity.model';
import { EntityReducer } from './entity.reducer';
import { EntityActions } from './entity.actions';
import { EntityState, initialEntityState } from './entity.state';
import {
  getIds,
  getSelectedId,
 } from './entity.selectors';

const entityMock: Entity = {
  id: 1,
  name: 'Real Entity',
  twitter: '@realentity',
  phone: '+17878901244'
};

const addItems: Entity[] = [{
  ...entityMock,
  id: 2,
  name: 'Real Entity 2',
  twitter: '@realentity2',
  phone: '+17878901222'
}, {
  ...entityMock,
  id: 3,
  name: 'Real Entity 3',
  twitter: '@realentity3',
  phone: '+17878903333'
}];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: EntityState = {
  ...addedData,
  selectedEntityId: null,
  error: null,
};

describe('EntityReducer', () => {
  const mockedState = (results = []): EntityState => (initialEntityState);

  const entityActions = new EntityActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = EntityReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_COMPLAINTS when there is no Entity on the state', () => {
    const state = mockedState();
    const actual = EntityReducer(state, entityActions.getEntities());
    const expected = {
      ids: [],
      entities: {},
      selectedEntityId: null,
      error: null
    };
    expect(actual).toEqual(expected);
  });

  it('should add items on LOAD_ENTITIES_SUCCESS', () => {
    const state = mockedState();
    const actual = EntityReducer(state, entityActions.loadEntitiesSuccess(addItems));
    const expected: EntityState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add items');
  });

});
