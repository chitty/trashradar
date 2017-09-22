import { createSelector } from 'reselect';

import { EntityState } from './entity.state';

/**
 * Returns all the entities entities selected.
 *
 * @param {state} OrderState
 */
export const getEntities = (state: EntityState) => state.entities;

/**
 * Returns all the ids of the selected entities.
 *
 * @param {state} EntityState
 */
export const getIds = (state: EntityState) => state.ids;

/**
 * Return the id of the selected entity.
 *
 * @param {state} EntityState
 */
export const getSelectedId = (state: EntityState) => state.selectedEntityId;

/**
 * Get all entities.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});
