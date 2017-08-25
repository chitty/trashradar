import {
  inject,
  async,
} from '@angular/core/testing';

import { Complaint } from './complaint.model';
import { ComplaintReducer } from './complaint.reducer';
import { ComplaintActions } from './complaint.actions';
import { ComplaintState, initialComplaintState } from './complaint.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getComplaintById,
  getComplaintsByOwner,
  getComplaintsByEntity,
  getComplaintsByCounter,
  getComplaintsByState
 } from './complaint.selectors';

const complaintMock: Complaint = {
  id: 1,
  owner: 1,
  location: {
    type: 'Point',
    coordinates: [1, 1]
  },
  entity: 1,
  picture: 'test',
  counter: 1,
  current_state: 1,
  tweet_status: [1],
};

const addItems: Complaint[] = [{
  ...complaintMock,
  id: 2,
  owner: 2,
  entity: 2,
  counter: 2,
  current_state: 2,
}, {
  ...complaintMock,
  id: 3,
  owner: 3,
  entity: 3,
  counter: 3,
  current_state: 3,
}];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: ComplaintState = {
  ...addedData,
  selectedComplaintId: null,
  error: null,
};

describe('ComplaintReducer', () => {
  const mockedState = (results = []): ComplaintState => (initialComplaintState);

  const complaintActions = new ComplaintActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = ComplaintReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_COMPLAINTS when there is no Complaint on the state', () => {
    const state = mockedState();
    const actual = ComplaintReducer(state, complaintActions.getComplaints());
    const expected = {
      ids: [],
      entities: {},
      selectedComplaintId: null,
      error: null
    };
    expect(actual).toEqual(expected);
  });

  it('should be able to CREATE_COMPLAINT_SUCCESS', () => {
    const state = mockedState();
    const actual = ComplaintReducer(state, complaintActions.createComplaintSuccess(complaintMock));
    const expected = {
      ids: [...state.ids, ...[complaintMock.id]],
      entities: Object.assign({}, state.entities, { [complaintMock.id]: complaintMock }),
      selectedComplaintId: complaintMock.id,
      error: null
    };
    expect(actual).toEqual(expected);
  });

  it('should NOT add a complaint on CREATE_COMPLAINT_FAIL and set the error', () => {
    const state = mockedState();
    const actual = ComplaintReducer(state, complaintActions.createComplaintFail(complaintMock));
    expect(actual.ids).toEqual([]);
    expect(actual.entities).toEqual({});
    expect(actual.error).toBeTruthy();
  });

  it('should add items on LOAD_COMPLAINTS_SUCCESS', () => {
    const state = mockedState();
    const actual = ComplaintReducer(state, complaintActions.loadComplaintsSuccess(addItems));
    const expected: ComplaintState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add items');
  });

  describe('when a Complaint already exists in the state', () => {
    const state = mockedState();
    let addedState = initialComplaintState;

    beforeEach(() => {
      addedState = ComplaintReducer(state, complaintActions.loadComplaintsSuccess([...addItems, complaintMock]));
    });

    it('should GET_COMPLAINTS when there already exists a Complaint on the state', () => {
      const actual = ComplaintReducer(addedState, complaintActions.getComplaints());
      const expected = addedState;
      expect(actual).toEqual(expected);
    });

    it('should GET_COMPLAINT will return the selected Complaint', () => {
      const actual = ComplaintReducer(addedState, complaintActions.getComplaint(complaintMock));
      const expected = {
        ids: [complaintMock.id],
        entities: { [complaintMock.id]: complaintMock },
        selectedComplaintId: complaintMock.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should update the given complaint on UPDATE_COMPLAINT', () => {
      const updatedComplaint = { ...complaintMock, description: 'derp', title: [] };
      const actual = ComplaintReducer(addedState, complaintActions.updateComplaintSuccess(updatedComplaint));
      const expected = {
        ...addedState,
        entities: { ...addedState.entities,  [updatedComplaint.id]: updatedComplaint },
        selectedComplaintId: updatedComplaint.id,
        error: null
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT update the given complaint on UPDATE_COMPLAINT_FAIL and set the error', () => {
      const updatedComplaint = { ...complaintMock, description: 'derp', title: [] };
      const actual = ComplaintReducer(addedState, complaintActions.updateComplaintFail(updatedComplaint));
      expect(actual.ids).toEqual(addedState.ids);
      expect(actual.entities).toEqual(addedState.entities);
      expect(actual.error).toBeTruthy();
    });

    it('should remove the given complaint on REMOVE_COMPLAINT_SUCCESS', () => {
      const actual = ComplaintReducer(addedState, complaintActions.removeComplaintSuccess(complaintMock));
      delete addedState.entities[complaintMock.id];
      const expected = {
        ...addedState,
        ids: addedState.ids.filter((id) => id !== complaintMock.id),
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT remove the given complaint on REMOVE_COMPLAINT_FAIL and set the error', () => {
      const actual = ComplaintReducer(addedState, complaintActions.removeComplaintFail(complaintMock));
      expect(actual.ids).toEqual(addedState.ids);
      expect(actual.entities).toEqual(addedState.entities);
      expect(actual.error).toBeTruthy();
    });

    it('getEntities should return all the entities of a ComplaintState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a ComplaintState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected ComplaintState', () => {
      const selectedComplaintId = getSelectedId(addedState);
      expect(selectedComplaintId).toEqual(addedState.selectedComplaintId);
    });

    it('getSelected should return the entity of the selected ComplaintState', () => {
      const selectedComplaint = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedComplaintId];
      expect(selectedComplaint).toEqual(selected);
    });

    it('getAll should return all the entities of the ComplaintState', () => {
      const selectedComplaint = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedComplaint).toEqual(selected);
    });

    it('getComplaintById should return a specific Complaint with the id provided', () => {
      const selectedComplaint = getComplaintById(addedState, complaintMock.id);
      expect(selectedComplaint).toEqual(complaintMock);
    });

    it('getComplaintByOwner should return complaints with the provided owner', () => {
      let selectedComplaint = getComplaintsByOwner(addedState, complaintMock.owner);
      expect(selectedComplaint).toEqual([complaintMock]);
      selectedComplaint = getComplaintsByOwner(addedState, -1);
      expect(selectedComplaint).toEqual([]);
    });

    it('getComplaintsByEntity should return complaints with the provided entity', () => {
      let selectedComplaints = getComplaintsByEntity(addedState, complaintMock.entity as number);
      expect(selectedComplaints).toEqual([complaintMock]);
      selectedComplaints = getComplaintsByEntity(addedState, -1);
      expect(selectedComplaints).toEqual([]);
    });

    it('getComplaintsByCounter should return complaints with the provided counter', () => {
      let selectedComplaints = getComplaintsByCounter(addedState, complaintMock.counter);
      expect(selectedComplaints).toEqual([complaintMock]);
      selectedComplaints = getComplaintsByCounter(addedState, -1);
      expect(selectedComplaints).toEqual([]);
    });

    it('getComplaintsByState should return complaints with the provided state', () => {
      let selectedComplaints = getComplaintsByState(addedState, complaintMock.current_state);
      expect(selectedComplaints).toEqual([complaintMock]);
      selectedComplaints = getComplaintsByState(addedState, -1);
      expect(selectedComplaints).toEqual([]);
    });
  });
});
