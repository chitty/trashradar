import { ActionReducer, Action } from '@ngrx/store';

import { Complaint } from './complaint.model';
import { ComplaintState, initialComplaintState } from './complaint.state';
import { ComplaintActions } from './complaint.actions';

export const ComplaintReducer: ActionReducer<ComplaintState> = (state = initialComplaintState, action: Action) => {
  switch (action.type) {
    case ComplaintActions.GET_COMPLAINTS:
      return { ...state, selectedComplaintId: null };

    case ComplaintActions.GET_COMPLAINT: {
      const complaint: Complaint = action.payload;

      return {
        ids: [ complaint.id ],
        entities: {
          [complaint.id]: complaint
        },
        selectedComplaintId: complaint.id,
      };
    }

    case ComplaintActions.CREATE_COMPLAINT_SUCCESS: {
      const complaint: Complaint = action.payload;

      return {
        ids: [ ...state.ids, complaint.id ],
        entities: Object.assign({}, state.entities, {
          [complaint.id]: complaint
        }),
        selectedComplaintId: complaint.id,
      };
    }

    case ComplaintActions.UPDATE_COMPLAINT_SUCCESS: {
      const complaint: Complaint = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [complaint.id]: complaint
        }),
        selectedComplaintId: complaint.id,
      };
    }

    case ComplaintActions.REMOVE_COMPLAINT_SUCCESS: {
      const complaint: Complaint = action.payload;
      delete state.entities[complaint.id];

      return {
        ids: state.ids.filter((id) => id !== complaint.id),
        entities: Object.assign({}, state.entities),
        selectedComplaintId: null,
      };
    }

    case ComplaintActions.LOAD_COMPLAINTS_SUCCESS: {
      const complaints: Complaint[] = action.payload;
      const { complaintEntities, complaintIds } = complaints.reduce((result, complaint) => {
        result.complaintEntities[complaint.id] = complaint;
        result.complaintIds.push(complaint.id);
        return result;
      }, { complaintEntities: {}, complaintIds: [] });

      return {
        ...state,
        ids: complaintIds,
        entities: complaintEntities,
      };
    }

    case ComplaintActions.CREATE_COMPLAINT_FAIL:
    case ComplaintActions.UPDATE_COMPLAINT_FAIL:
    case ComplaintActions.REMOVE_COMPLAINT_FAIL:
    case ComplaintActions.LOAD_COMPLAINTS_FAIL:
    default: {
      return state;
    }
  }
};
