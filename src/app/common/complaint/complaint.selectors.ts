import { createSelector } from 'reselect';

import { ComplaintState } from './complaint.state';

/**
 * Returns all the complaint entities selected.
 *
 * @param {state} ComplaintState
 */
export const getEntities = (state: ComplaintState) => state.entities;

/**
 * Returns all the ids of the selected complaints.
 *
 * @param {state} ComplaintState
 */
export const getIds = (state: ComplaintState) => state.ids;

/**
 * Return the id of the selected complaint.
 *
 * @param {state} ComplaintState
 */
export const getSelectedId = (state: ComplaintState) => state.selectedComplaintId;

/**
 * Return the specific complaint selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all complaints.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the complaint entity with specified name.
 *
 * @param {state} ComplaintState
 * @param {complaintId} number Complaint Id to be returned
 */
export const getComplaintById = (state: ComplaintState, complaintId: number) => {
  return state.entities[complaintId];
};

/**
 * Return all complaints with a specified owner.
 *
 * @param {state} ComplaintState
 * @param {owner} number - owner
 */
export const getComplaintsByOwner = (state: ComplaintState, owner: number) => {
  return state.ids.reduce((result, id) => {
    const complaint = state.entities[id];
    if (complaint.owner === owner) {
      result.push(complaint);
    }
    return result;
  }, []);
};

/**
 * Return all complaints with a specified entity.
 *
 * @param {state} ComplaintState
 * @param {entity} number - entity
 */
export const getComplaintsByEntity = (state: ComplaintState, entity: number) => {
  return state.ids.reduce((result, id) => {
    const complaint = state.entities[id];
    if (complaint.entity === entity) {
      result.push(complaint);
    }
    return result;
  }, []);
};

/**
 * Return all complaints with a specified counter.
 *
 * @param {state} ComplaintState
 * @param {counter} number - counter
 */
export const getComplaintsByCounter = (state: ComplaintState, counter: number) => {
  return state.ids.reduce((result, id) => {
    const complaint = state.entities[id];
    if (complaint.counter === counter) {
      result.push(complaint);
    }
    return result;
  }, []);
};


/**
 * Return all complaints with a specified state.
 *
 * @param {state} ComplaintState
 * @param {currentState} number - currentState
 */
export const getComplaintsByState = (state: ComplaintState, currentState: number) => {
  return state.ids.reduce((result, id) => {
    const complaint = state.entities[id];
    if (complaint.current_state === currentState) {
      result.push(complaint);
    }
    return result;
  }, []);
};
