import { createSelector } from 'reselect';
import { EffectsModule } from '@ngrx/effects';

import * as auth from '../auth';
import * as complaint from '../complaint';
import * as entity from '../entity';

export interface AppState {
  auth: auth.AuthState;
  complaint: complaint.ComplaintState;
  entity: entity.EntityState;
}

export const moduleReducers = [{
  reducer: { auth: auth.AuthReducer },
  actions: auth.AuthActions,
}, {
  reducer: { complaint: complaint.ComplaintReducer },
  actions: complaint.ComplaintActions,
}, {
  reducer: { entity: entity.EntityReducer },
  actions: entity.EntityActions,
}];

export const moduleEffects = [
  EffectsModule.run(auth.AuthEffects),
  EffectsModule.run(complaint.ComplaintEffects),
];
/**
 * Function mapping the state tree into a specific state
 */
export const getAuthState = (state: AppState): auth.AuthState => state.auth;
export const getUser = createSelector(getAuthState, auth.getUser);
export const isAuthInProgress = createSelector(getAuthState, auth.getProgress);
export const getAuthError: any = createSelector(getAuthState, auth.getError);

export const getEntityState = (state: AppState): entity.EntityState => state.entity;
export const getAllEntities = createSelector(getEntityState, entity.getAll);

export const getComplaintState = (state: AppState): complaint.ComplaintState => state.complaint;
export const getComplaintIds = createSelector(getComplaintState, complaint.getIds);
export const getComplaintEntities = createSelector(getComplaintState, complaint.getEntities);
export const getAllComplaints = createSelector(getComplaintState, complaint.getAll);
export const getComplaintsByEntity = (thisEntity) => (state) => complaint.getComplaintsByEntity(state.complaint, thisEntity);
export const getComplaintsByCounter = (counter) => (state) => complaint.getComplaintsByCounter(state.complaint, counter);
export const getComplaintsByState = (currentState) => (state) => complaint.getComplaintsByState(state.complaint, currentState);
export const getComplaintsByOwner = (owner) => (state) => complaint.getComplaintsByOwner(state.complaint, owner);
export const getComplaintById = (id) => (state) => complaint.getComplaintById(state.complaint, id);
