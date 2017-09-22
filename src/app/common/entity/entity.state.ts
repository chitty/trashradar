import { Entity } from './entity.model';

export interface EntityState {
  ids: number[];
  entities: { [id: number]: Entity };
  selectedEntityId: number | null;
  error?: object;
}

export const initialEntityState: EntityState = {
  ids: [],
  entities: {},
  selectedEntityId: null,
  error: null
};
